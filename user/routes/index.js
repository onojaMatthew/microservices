const express = require("express");
const {
  signup,
  signin,
  signout,
  createPoll,
  uploadPhoto,
  deletePoll,
  votePoll,
  likePoll,
  disablePoll,
  tagsPoll,
  fetchAllUsers,
  userDelete,
  enablePoll,
} = require( "../controller" );
const router = express.Router();
const requireLogin = require("../config/auth")

router.post('/signup/:userType', signup);
router.post("/signin", signin);
router.get( '/signout', signout );
router.get( "/all", fetchAllUsers );
router.put( "/create/:userType/:pollId/:userId", requireLogin, createPoll );
router.put( "/disable/:userType/:pollId/:userId", requireLogin, disablePoll );
router.put( "/enable/:userType/:pollId/:userId", requireLogin, enablePoll );
router.put( "/like/:userType/:pollId/:userId", requireLogin, likePoll );
router.put( "/vote/:userType/:pollId/:userId", requireLogin, votePoll );
router.put( "/tags/:userType/:pollId/:userId", requireLogin, tagsPoll );
router.post( "/upload/:userType/:userId", requireLogin, uploadPhoto );
router.delete( "/delete_user/:userId", userDelete );
router.delete( "/delete/:pollId", requireLogin, deletePoll );

module.exports = router;
