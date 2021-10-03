const express = require("express");
const router = express.Router();

const {
  postGetController,
  postPostController,
  postPutController,
  postDeleteController,
} = require("../controller/postsController");

router.get("/", postGetController);
router.post("/", postPostController);
router.put("/", postPutController);
router.delete("/", postDeleteController);

module.exports = router;
