const authController = require("../controllers/authController");

module.exports = [
  { method: "POST", path: "/api/auth/register", handler: authController.register },
  { method: "POST", path: "/api/auth/login", handler: authController.login },
  { method: "POST", path: "/api/auth/logout", handler: authController.logout },
  { method: "GET", path: "/api/auth/me", handler: authController.getCurrentUser }
];
