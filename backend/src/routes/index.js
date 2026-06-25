const apiRoutes = require("./apiRoutes");
const authRoutes = require("./authRoutes");
const transactionRoutes = require("./transactionRoutes");
const categoryRoutes = require("./categoryRoutes");
const budgetRoutes = require("./budgetRoutes");
const dashboardRoutes = require("./dashboardRoutes");
const sharedExpenseRoutes = require("./sharedExpenseRoutes");

module.exports = [
  ...apiRoutes,
  ...authRoutes,
  ...transactionRoutes,
  ...categoryRoutes,
  ...budgetRoutes,
  ...dashboardRoutes,
  ...sharedExpenseRoutes
];
