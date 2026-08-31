import * as categoriesService from "./categories.service.js";

export async function list(req, res) {
  const categories = await categoriesService.listCategories();
  res.json({ success: true, message: "Categories fetched", data: categories });
}
