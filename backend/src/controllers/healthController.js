const { sendJson } = require("../utils/response");

function getHealth(req, res) {
  sendJson(res, 200, {
    status: "ok",
    service: "personal-expense-tracker-api",
    timestamp: new Date().toISOString()
  });
}

module.exports = {
  getHealth
};
