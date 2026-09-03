-- Create the Company table
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "logoUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Company_name_key" ON "Company"("name");

-- Backfill: one Company row per distinct non-blank company name already on Job
INSERT INTO "Company" ("name", "updatedAt")
SELECT DISTINCT NULLIF(TRIM("company"), ''), CURRENT_TIMESTAMP
FROM "Job"
WHERE NULLIF(TRIM("company"), '') IS NOT NULL
ON CONFLICT ("name") DO NOTHING;

-- Fallback company for any job left with a blank/empty company value
INSERT INTO "Company" ("name", "updatedAt")
VALUES ('Unknown Company', CURRENT_TIMESTAMP)
ON CONFLICT ("name") DO NOTHING;

-- Add the new FK column (nullable for now, so it can be backfilled)
ALTER TABLE "Job" ADD COLUMN "companyId" INTEGER;

UPDATE "Job" j
SET "companyId" = c."id"
FROM "Company" c
WHERE c."name" = NULLIF(TRIM(j."company"), '');

UPDATE "Job" j
SET "companyId" = (SELECT "id" FROM "Company" WHERE "name" = 'Unknown Company')
WHERE j."companyId" IS NULL;

-- Now that every row has a companyId, make it required and drop the old string column
ALTER TABLE "Job" ALTER COLUMN "companyId" SET NOT NULL;
ALTER TABLE "Job" DROP COLUMN "company";

CREATE INDEX "Job_companyId_idx" ON "Job"("companyId");
ALTER TABLE "Job" ADD CONSTRAINT "Job_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
