const transactionController = require("../controllers/transactionController");

module.exports = [
  { method: "GET", path: "/api/transactions", handler: transactionController.listTransactions },
  { method: "POST", path: "/api/transactions", handler: transactionController.createTransaction },
  { method: "GET", path: "/api/transactions/:id", handler: transactionController.getTransaction },
  { method: "PUT", path: "/api/transactions/:id", handler: transactionController.updateTransaction },
  { method: "DELETE", path: "/api/transactions/:id", handler: transactionController.deleteTransaction }
];
