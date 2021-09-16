const express = require("express");
const router = express.Router();

const {
  postController,
  postPostController,
  postPutController,
} = require("../controller/postsController");

router.get("/", postController);
router.post("/", postPostController);
router.put("/", postPutController);

module.exports = router;
