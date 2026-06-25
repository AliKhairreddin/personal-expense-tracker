const { sendJson, sendStub } = require("../utils/response");

function listSharedExpenses(req, res) {
  sendJson(res, 200, {
    data: [],
    message: "Shared-expense route is working. Database results will replace this empty array."
  });
}

function getSharedExpense(req, res) {
  sendStub(res, `Get shared expense ${req.params.id}`);
}

function createSharedExpense(req, res) {
  sendStub(res, "Create shared expense");
}

function updateSharedExpense(req, res) {
  sendStub(res, `Update shared expense ${req.params.id}`);
}

function deleteSharedExpense(req, res) {
  sendStub(res, `Delete shared expense ${req.params.id}`);
}

function listMembers(req, res) {
  sendJson(res, 200, {
    sharedExpenseId: req.params.id,
    data: [],
    message: "Shared-expense member route is working."
  });
}

function addMember(req, res) {
  sendStub(res, `Add member to shared expense ${req.params.id}`);
}

function updateMember(req, res) {
  sendStub(
    res,
    `Update member ${req.params.memberId} in shared expense ${req.params.id}`
  );
}

function deleteMember(req, res) {
  sendStub(
    res,
    `Delete member ${req.params.memberId} from shared expense ${req.params.id}`
  );
}

module.exports = {
  listSharedExpenses,
  getSharedExpense,
  createSharedExpense,
  updateSharedExpense,
  deleteSharedExpense,
  listMembers,
  addMember,
  updateMember,
  deleteMember
};
