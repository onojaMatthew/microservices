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
} = require( "../controller" );
const router = express.Router();
const requireLogin = require("../config/auth")

router.post('/signup/:userType', signup);
router.post("/signin", signin);
router.get( '/signout', signout );
router.get( "/all", fetchAllUsers );
router.post( "/create/:userType/:userId", requireLogin, createPoll );
router.put( "/disable/:userType/:pollId/:userId", requireLogin, disablePoll );
router.put( "/like/:userType/:pollId/:userId", requireLogin, likePoll );
router.put( "/vote/:userType/:pollId/:userId", requireLogin, votePoll );
router.put( "/tags/:userType/:pollId/:userId", requireLogin, tagsPoll );
router.put( "/upload/:userType/:pollId/:userId", requireLogin, uploadPhoto );
router.delete( "/delete_user/:userId", userDelete );
router.delete( "/delete/:pollId", requireLogin, deletePoll );

module.exports = router;
