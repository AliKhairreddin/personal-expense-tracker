const { sendJson, sendStub } = require("../utils/response");

function listBudgets(req, res) {
  sendJson(res, 200, {
    data: [],
    message: "Budget route is working. Database results will replace this empty array."
  });
}

function getBudget(req, res) {
  sendStub(res, `Get budget ${req.params.id}`);
}

function createBudget(req, res) {
  sendStub(res, "Create budget");
}

function updateBudget(req, res) {
  sendStub(res, `Update budget ${req.params.id}`);
}

function deleteBudget(req, res) {
  sendStub(res, `Delete budget ${req.params.id}`);
}

function compareBudget(req, res) {
  sendStub(res, `Compare budget ${req.params.id} with actual spending`);
}

module.exports = {
  listBudgets,
  getBudget,
  createBudget,
  updateBudget,
  deleteBudget,
  compareBudget
};
