const budgetController = require("../controllers/budgetController");

module.exports = [
  { method: "GET", path: "/api/budgets", handler: budgetController.listBudgets },
  { method: "POST", path: "/api/budgets", handler: budgetController.createBudget },
  { method: "GET", path: "/api/budgets/:id", handler: budgetController.getBudget },
  { method: "PUT", path: "/api/budgets/:id", handler: budgetController.updateBudget },
  { method: "DELETE", path: "/api/budgets/:id", handler: budgetController.deleteBudget },
  { method: "GET", path: "/api/budgets/:id/comparison", handler: budgetController.compareBudget }
];
