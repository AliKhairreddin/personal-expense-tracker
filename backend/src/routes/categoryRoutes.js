const categoryController = require("../controllers/categoryController");

module.exports = [
  { method: "GET", path: "/api/categories", handler: categoryController.listCategories },
  { method: "POST", path: "/api/categories", handler: categoryController.createCategory },
  { method: "PUT", path: "/api/categories/:id", handler: categoryController.updateCategory },
  { method: "DELETE", path: "/api/categories/:id", handler: categoryController.deleteCategory }
];
