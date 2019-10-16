const express = require("express");
const {
  createPoll,
  votePoll,
  likePoll,
  deletePoll,
  fetchAllPoll,
  uploadPhoto
} = require("../controller");

const router = express.Router();

router.post("/create", createPoll);
router.get("/all", fetchAllPoll);
router.put( "/like/:pollId/userId", likePoll );
router.put( "/vote/:pollId/userId" votePoll)
router.put( "/upload/:usertype/:pollId", uploadPhoto );
router.delete("/delete/:pollId", deletePoll);

module.exports = router;