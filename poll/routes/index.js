const express = require("express");
const {
  createPoll,
  votePoll,
  likePoll,
  deletePoll,
  fetchAllPoll,
  uploadPhoto,
  tags,
  disablePoll
} = require( "../controller" );
const upload = require( "../middleware/fileupload" );

const router = express.Router();

router.get( "/all", fetchAllPoll );
router.post( "/create/:userId/:usertype", createPoll );
router.put( "/like/:usertype/:pollId/:userId/", likePoll );
router.put( "/tags/:usertype/:pollId", tags );
router.put( "/disable/:usertype/:pollId", disablePoll );
router.put( "/vote/:usertype/:pollId/:userId", votePoll );
router.put( "/upload/:usertype/:pollId/", upload.single("file"), uploadPhoto );
router.delete("/delete/:pollId", deletePoll );

module.exports = router;

// 5da7275923ee4a1088eeaf9b