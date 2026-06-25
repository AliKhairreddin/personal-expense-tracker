const { sendJson } = require("../utils/response");

function getApiOverview(req, res) {
  sendJson(res, 200, {
    project: "Personal Expense Tracker",
    milestone: 2,
    message: "Back-end server, route files, and controller files are initialized.",
    routes: {
      health: "GET /api/health",
      authentication: [
        "POST /api/auth/register",
        "POST /api/auth/login",
        "POST /api/auth/logout",
        "GET /api/auth/me"
      ],
      transactions: [
        "GET /api/transactions",
        "POST /api/transactions",
        "GET /api/transactions/:id",
        "PUT /api/transactions/:id",
        "DELETE /api/transactions/:id"
      ],
      categories: [
        "GET /api/categories",
        "POST /api/categories",
        "PUT /api/categories/:id",
        "DELETE /api/categories/:id"
      ],
      budgets: [
        "GET /api/budgets",
        "POST /api/budgets",
        "GET /api/budgets/:id",
        "PUT /api/budgets/:id",
        "DELETE /api/budgets/:id",
        "GET /api/budgets/:id/comparison"
      ],
      dashboard: "GET /api/dashboard/summary",
      sharedExpenses: [
        "GET /api/shared-expenses",
        "POST /api/shared-expenses",
        "GET /api/shared-expenses/:id",
        "PUT /api/shared-expenses/:id",
        "DELETE /api/shared-expenses/:id",
        "GET /api/shared-expenses/:id/members",
        "POST /api/shared-expenses/:id/members",
        "PUT /api/shared-expenses/:id/members/:memberId",
        "DELETE /api/shared-expenses/:id/members/:memberId"
      ]
    }
  });
}

module.exports = {
  getApiOverview
};
