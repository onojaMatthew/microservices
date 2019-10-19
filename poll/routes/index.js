const express = require("express");
const {
  createPoll,
  votePoll,
  likePoll,
  deletePoll,
  fetchAllPoll,
  uploadPhoto,
  tags,
  disablePoll,
  enablePoll,
} = require( "../controller" );
const upload = require( "../middleware/fileupload" );

const router = express.Router();

router.get( "/all", fetchAllPoll );
router.put( "/create/:userId/:userType/:pollId", createPoll );
router.put( "/like/:userType/:pollId/:userId/", likePoll );
router.put( "/tags/:userType/:pollId", tags );
router.put( "/disable/:userType/:pollId", disablePoll );
router.put( "/enable/:userType/:pollId", enablePoll );
router.put( "/vote/:userType/:pollId/:userId", votePoll );
router.post( "/upload/:userType", upload.single("photo"), uploadPhoto );
router.delete("/delete/:pollId", deletePoll );

module.exports = router;

// 5da7275923ee4a1088eeaf9b