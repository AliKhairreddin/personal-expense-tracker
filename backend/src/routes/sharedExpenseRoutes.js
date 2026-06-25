const sharedExpenseController = require("../controllers/sharedExpenseController");

module.exports = [
  { method: "GET", path: "/api/shared-expenses", handler: sharedExpenseController.listSharedExpenses },
  { method: "POST", path: "/api/shared-expenses", handler: sharedExpenseController.createSharedExpense },
  { method: "GET", path: "/api/shared-expenses/:id", handler: sharedExpenseController.getSharedExpense },
  { method: "PUT", path: "/api/shared-expenses/:id", handler: sharedExpenseController.updateSharedExpense },
  { method: "DELETE", path: "/api/shared-expenses/:id", handler: sharedExpenseController.deleteSharedExpense },
  { method: "GET", path: "/api/shared-expenses/:id/members", handler: sharedExpenseController.listMembers },
  { method: "POST", path: "/api/shared-expenses/:id/members", handler: sharedExpenseController.addMember },
  {
    method: "PUT",
    path: "/api/shared-expenses/:id/members/:memberId",
    handler: sharedExpenseController.updateMember
  },
  {
    method: "DELETE",
    path: "/api/shared-expenses/:id/members/:memberId",
    handler: sharedExpenseController.deleteMember
  }
];
