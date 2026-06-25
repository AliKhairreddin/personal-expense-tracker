const { sendJson, sendStub } = require("../utils/response");

function listTransactions(req, res) {
  sendJson(res, 200, {
    data: [],
    filters: req.query,
    message: "Transaction route is working. Database results will replace this empty array."
  });
}

function getTransaction(req, res) {
  sendStub(res, `Get transaction ${req.params.id}`);
}

function createTransaction(req, res) {
  sendStub(res, "Create transaction");
}

function updateTransaction(req, res) {
  sendStub(res, `Update transaction ${req.params.id}`);
}

function deleteTransaction(req, res) {
  sendStub(res, `Delete transaction ${req.params.id}`);
}

module.exports = {
  listTransactions,
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction
};
