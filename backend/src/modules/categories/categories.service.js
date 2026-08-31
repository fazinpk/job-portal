import { prisma } from "../../lib/prisma.js";

export function listCategories() {
  return prisma.category.findMany({ orderBy: { name: "asc" } });
}
