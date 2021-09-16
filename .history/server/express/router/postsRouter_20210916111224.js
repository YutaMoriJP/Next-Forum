const express = require("express");
const router = express.Router();

const { postController } = require("../controller/postsController");

router.get("/", postController);

module.exports = router;
