import { prisma } from "../../lib/prisma.js";
import { ApiError } from "../../utils/ApiError.js";

async function assertCategoryExists(categoryId) {
  const category = await prisma.category.findUnique({ where: { id: categoryId } });
  if (!category) throw new ApiError(400, "Category does not exist");
}

export async function createJob(data, adminId) {
  await assertCategoryExists(data.categoryId);

  return prisma.job.create({
    data: { ...data, createdById: adminId },
    include: { category: true },
  });
}

export async function listJobs(query) {
  const { page, limit, categoryId, experienceLevel, employmentType, status, search } = query;

  const where = {
    ...(categoryId && { categoryId }),
    ...(experienceLevel && { experienceLevel }),
    ...(employmentType && { employmentType }),
    ...(status && { status }),
    ...(search && {
      OR: [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ],
    }),
  };

  const [jobs, total] = await Promise.all([
    prisma.job.findMany({
      where,
      include: { category: true },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.job.count({ where }),
  ]);

  return { jobs, meta: { page, limit, total, totalPages: Math.max(Math.ceil(total / limit), 1) } };
}

export async function getJobById(id) {
  const job = await prisma.job.findUnique({ where: { id }, include: { category: true } });
  if (!job) throw new ApiError(404, "Job not found");
  return job;
}

export async function updateJob(id, data) {
  await getJobById(id);
  if (data.categoryId) await assertCategoryExists(data.categoryId);

  return prisma.job.update({ where: { id }, data, include: { category: true } });
}

export async function deleteJob(id) {
  await getJobById(id);
  await prisma.job.delete({ where: { id } });
}
