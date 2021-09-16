const express = require("express");
const router = express.Router();

const {
  postController,
  postPostController,
} = require("../controller/postsController");

router.get("/", postController);
router.post("/", postPostController);

module.exports = router;
