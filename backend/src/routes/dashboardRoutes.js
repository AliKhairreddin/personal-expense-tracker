const dashboardController = require("../controllers/dashboardController");

module.exports = [
  { method: "GET", path: "/api/dashboard/summary", handler: dashboardController.getSummary }
];
