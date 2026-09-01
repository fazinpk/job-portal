import * as dashboardService from "./dashboard.service.js";

export async function getStats(req, res) {
  const stats = await dashboardService.getDashboardStats();
  res.json({ success: true, message: "Dashboard stats fetched", data: stats });
}
