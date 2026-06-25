const apiController = require("../controllers/apiController");
const healthController = require("../controllers/healthController");

module.exports = [
  { method: "GET", path: "/api", handler: apiController.getApiOverview },
  { method: "GET", path: "/api/health", handler: healthController.getHealth }
];
