const express = require("express");
const router = express.Router();

const {
  postGetController,
  postPostController,
  postPutController,
} = require("../controller/postsController");

router.get("/", postGetController);
router.post("/", postPostController);
router.put("/", postPutController);

module.exports = router;
