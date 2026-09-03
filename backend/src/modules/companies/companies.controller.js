import * as companiesService from "./companies.service.js";

export async function list(req, res) {
  const companies = await companiesService.listCompanies();
  res.json({ success: true, message: "Companies fetched", data: companies });
}

export async function create(req, res) {
  const company = await companiesService.createCompany(req.body, req.file);
  res.status(201).json({ success: true, message: "Company created", data: company });
}

export async function update(req, res) {
  const company = await companiesService.updateCompany(req.params.id, req.body, req.file);
  res.json({ success: true, message: "Company updated", data: company });
}

export async function remove(req, res) {
  await companiesService.deleteCompany(req.params.id);
  res.json({ success: true, message: "Company deleted", data: null });
}
