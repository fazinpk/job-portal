import * as jobsService from "./jobs.service.js";

export async function create(req, res) {
  const job = await jobsService.createJob(req.body, req.admin.id);
  res.status(201).json({ success: true, message: "Job created", data: job });
}

export async function list(req, res) {
  const { jobs, meta } = await jobsService.listJobs(req.query);
  res.json({ success: true, message: "Jobs fetched", data: jobs, meta });
}
