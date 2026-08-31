import { prisma } from "../../lib/prisma.js";
import { ApiError } from "../../utils/ApiError.js";

export async function createJob(data, adminId) {
  const category = await prisma.category.findUnique({ where: { id: data.categoryId } });
  if (!category) throw new ApiError(400, "Category does not exist");

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
