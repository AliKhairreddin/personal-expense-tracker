const { sendJson, sendStub } = require("../utils/response");

function listCategories(req, res) {
  sendJson(res, 200, {
    data: [],
    message: "Category route is working. Database results will replace this empty array."
  });
}

function createCategory(req, res) {
  sendStub(res, "Create custom category");
}

function updateCategory(req, res) {
  sendStub(res, `Update category ${req.params.id}`);
}

function deleteCategory(req, res) {
  sendStub(res, `Delete category ${req.params.id}`);
}

module.exports = {
  listCategories,
  createCategory,
  updateCategory,
  deleteCategory
};
