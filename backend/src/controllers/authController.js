const { sendStub } = require("../utils/response");

function register(req, res) {
  sendStub(res, "Register user");
}

function login(req, res) {
  sendStub(res, "Log in user");
}

function logout(req, res) {
  sendStub(res, "Log out user");
}

function getCurrentUser(req, res) {
  sendStub(res, "Get current authenticated user");
}

module.exports = {
  register,
  login,
  logout,
  getCurrentUser
};
