import { put, del } from "@vercel/blob";
import { prisma } from "../../lib/prisma.js";
import { ApiError } from "../../utils/ApiError.js";

async function uploadLogo(file) {
  const blob = await put(`company-logos/${Date.now()}-${file.originalname}`, file.buffer, {
    access: "public",
    contentType: file.mimetype,
  });
  return blob.url;
}

export function listCompanies() {
  return prisma.company.findMany({ orderBy: { name: "asc" } });
}

export async function getCompanyById(id) {
  const company = await prisma.company.findUnique({ where: { id } });
  if (!company) throw new ApiError(404, "Company not found");
  return company;
}

export async function createCompany(data, file) {
  const logoUrl = file ? await uploadLogo(file) : undefined;

  try {
    return await prisma.company.create({ data: { ...data, logoUrl } });
  } catch (err) {
    if (err.code === "P2002") throw new ApiError(409, "A company with this name already exists");
    throw err;
  }
}

export async function updateCompany(id, data, file) {
  const existing = await getCompanyById(id);
  const logoUrl = file ? await uploadLogo(file) : undefined;

  try {
    const updated = await prisma.company.update({
      where: { id },
      data: { ...data, ...(logoUrl && { logoUrl }) },
    });

    if (logoUrl && existing.logoUrl) {
      await del(existing.logoUrl).catch(() => {});
    }

    return updated;
  } catch (err) {
    if (err.code === "P2002") throw new ApiError(409, "A company with this name already exists");
    throw err;
  }
}

export async function deleteCompany(id) {
  const existing = await getCompanyById(id);

  const jobCount = await prisma.job.count({ where: { companyId: id } });
  if (jobCount > 0) {
    throw new ApiError(400, `Cannot delete: ${jobCount} job(s) still reference this company`);
  }

  await prisma.company.delete({ where: { id } });

  if (existing.logoUrl) {
    await del(existing.logoUrl).catch(() => {});
  }
}
