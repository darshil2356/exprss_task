const express = require("express");
const {
  getUser,
  registerUser,
  login,
  logout,
} = require("../controller/user_controller");
const validationToken = require("../middleware/auth");
const router = express.Router();

router.route("/").get(getUser);
router.route("/register").post(registerUser);
router.route("/login").post(login);
router.route("/logout").put(validationToken, logout);

module.exports = router;
