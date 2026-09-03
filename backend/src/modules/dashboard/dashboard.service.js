import { prisma } from "../../lib/prisma.js";
import { jobStatuses } from "../jobs/jobs.schema.js";

export async function getDashboardStats() {
  const [totalJobs, totalCategories, byStatusRaw, byCategoryRaw, immediateJoinerCount, totalCompanies] =
    await Promise.all([
      prisma.job.count(),
      prisma.category.count(),
      prisma.job.groupBy({ by: ["status"], _count: { _all: true } }),
      prisma.job.groupBy({ by: ["categoryId"], _count: { _all: true } }),
      prisma.job.count({ where: { isImmediateJoiner: true } }),
      prisma.company.count(),
    ]);

  const byStatus = Object.fromEntries(jobStatuses.map((status) => [status, 0]));
  for (const row of byStatusRaw) byStatus[row.status] = row._count._all;

  const byCategory = byCategoryRaw.map((row) => ({ categoryId: row.categoryId, count: row._count._all }));

  return { totalJobs, totalCategories, byStatus, byCategory, immediateJoinerCount, totalCompanies };
}
