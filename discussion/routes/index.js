const express = require("express");
const {
  postDiscussion,
  fetchDiscussion,
  deleteDiscussion,
  fetchAllDiscussion,
} = require("../controller");

const router = express.Router();

router.post("/create", postDiscussion);
router.get("/all", fetchAllDiscussion);
router.post("/", fetchDiscussion);
router.delete("/:discussionId", deleteDiscussion);

module.exports = router;