const db = require("../database");
const { sendJson } = require("../utils/response");
async function listCategories(req, res) {
  try {
    const [rows] = await db.query(
      `
      SELECT 
        category_id,
        category_name,
        category_type
      FROM categories
      WHERE user_id = ?
      `,
      [1]
    );
    const categories = rows.map((category) => ({
      id: category.category_id,
      name: category.category_name,
      type: category.category_type
    }));

    sendJson(res, 200, {
      data: categories
    });

  } catch (error) {
    console.error("LIST CATEGORY ERROR:", error);

    sendJson(res, 500, {
      message: "Failed to fetch categories."
    });
  }
}

async function createCategory(req, res) {
  try {
    const {
      name,
      type
    } = req.body;
    const userId = 1;
    const [result] = await db.query(
      `
      INSERT INTO categories
      (
        user_id,
        category_name,
        category_type
      )
      VALUES (?, ?, ?)
      `,
      [
        userId,
        name,
        type
      ]
    );

    sendJson(res, 201, {
      data: {
        id: result.insertId,
        name,
        type
      },
      message: "Category created successfully."
    });
  } catch (error) {
    console.error("CREATE CATEGORY ERROR:", error);
    sendJson(res, 500, {
      message: error.message
    });
  }
}

async function updateCategory(req, res) {
  try {
    const {
      name,
      type
    } = req.body;
    const categoryId = req.params.id;
    await db.query(
      `
      UPDATE categories
      SET
        category_name = ?,
        category_type = ?
      WHERE category_id = ?
      `,
      [
        name,
        type,
        categoryId
      ]
    );
    sendJson(res, 200, {
      data: {
        id: Number(categoryId),
        name,
        type
      },
      message: "Category updated successfully."
    });
  } catch (error) {
    console.error("UPDATE CATEGORY ERROR:", error);
    sendJson(res, 500, {
      message: error.message
    });
  }
}

async function deleteCategory(req, res) {
  try {
    const categoryId = req.params.id;
    await db.query(
      `
      DELETE FROM categories
      WHERE category_id = ?
      `,
      [categoryId]
    );
    sendJson(res, 200, {
      message: "Category deleted successfully."
    });
  } catch (error) {
    console.error("DELETE CATEGORY ERROR:", error);
    sendJson(res, 500, {
      message: error.message
    });
  }
}

module.exports = {
  listCategories,
  createCategory,
  updateCategory,
  deleteCategory
};
