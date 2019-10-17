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
router.post( "/create/:userId/:userType", createPoll );
router.put( "/like/:userType/:pollId/:userId/", likePoll );
router.put( "/tags/:userType/:pollId", tags );
router.put( "/disable/:userType/:pollId", disablePoll );
router.put( "/vote/:userType/:pollId/:userId", votePoll );
router.put( "/upload/:userType/:pollId", upload.single("photo"), uploadPhoto );
router.delete("/delete/:pollId", deletePoll );

module.exports = router;

// 5da7275923ee4a1088eeaf9b