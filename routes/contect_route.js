const express = require("express");
const { createPost, getPost } = require("../controller/contect_controller");
const validationToken = require("../middleware/auth");
const router = express.Router();

router.route("/create").post(validationToken, createPost);
router.route("/").get(validationToken, getPost);

module.exports = router;