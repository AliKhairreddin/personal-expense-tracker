const db = require("../database");
const { getDashboardSummary } = require("../services/dashboardService");
const { sendJson } = require("../utils/response");

async function getSummary(req, res) {
  const userId = getUserId(req);

  if (!userId) {
    sendJson(res, 400, {
      status: "error",
      message: "A valid user ID is required.",
    });
    return;
  }

  const summary = await getDashboardSummary(db, userId);

  sendJson(res, 200, {
    data: summary,
  });
}

function getUserId(req) {
  // Authentication can populate req.user later. The seeded demo user keeps
  // integration usable until the authentication task is merged.
  const requestedId = req.user?.id ?? req.query.userId ?? 1;
  const userId = Number(requestedId);

  return Number.isInteger(userId) && userId > 0 ? userId : null;
}

module.exports = {
  getSummary,
};
