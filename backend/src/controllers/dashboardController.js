const { sendStub } = require("../utils/response");

function getSummary(req, res) {
  sendStub(res, "Get dashboard income, expense, balance, and budget summary");
}

module.exports = {
  getSummary
};
