const { Poll } = require("../model");

// We create 
exports.createPoll = ( req, res ) => {
  // We destructure @userId and @usertype from request params
  const { userId, usertype } = req.params;
  // We destructure @name from request body
  const { name } = req.body;
  // We check for the poll name in the request body. If not proveded, we return the error message
  if ( !name ) return res.status( 400 ).json( { error: "Name is not provided. A poll must have a name" } );
  // We check the user type. If it's not admin, return the error message
  if ( usertype !== "admin" ) return res.status( 400 ).json( { error: "Only an admin allowed for this operation" });
  
  // We create a new poll here with name provided
  let poll = new Poll({
    name,
    createdBy: userId
  });
  return poll.save()
    .then( result => {
      // We check if the promise @result was returned. If not return the error message
      if ( !result ) return res.status( 400 ).json( { error: "Can not create new poll. Please try again" });
      res.json(result);
    })
    .catch(err => {
      res.json(err.message);
    });
}

// Add new tags to the poll with provided ID @pollId
exports.tags = ( req, res ) => {
  const newObj = req.body;
  const { usertype, pollId } = req.params;

  // We check for user type. If it is not admin return the error message
  if ( usertype === "admin" ) return res.status( 403 ).json( {
    error: "Only admin is allowed access to this operation"
  } );
  if ( !pollId ) return res.status( 400 ).json( {
    error: "Poll ID is not provided. Please ensure you are authorized for this operation"
  } );

  Poll.findByIdAndUpdate( pollId, { $push: { tags: newObj } }, { new: true } )
    .then( poll => {
      if ( !poll ) return res.status( 400 ).json( {
        error: "Could not add new tags. Please try again later"
      } );
      res.json( poll );
    } )
    .catch( err => {
      res.json( { error: err.message } );
    } );
}

// Allow users to vote for a particular poll
exports.votePoll = ( req, res ) => {
  const { userId, pollId, usertype } = req.params;

  // We check whether the user type is available in the request params. If not, return the error message
  if ( usertype !== "user" ) return res.status( 400 ).json( { error: "Only users can vote" } );
  // We check for the user ID in the rquest params. If not provided, return the error message
  if ( !userId ) return res.status( 400 ).json( { error: "No user Id provided. Ensure you're correctly logged in" } );
  // We check if the poll ID is in the request params. If not, return the error message
  if ( !pollId ) return res.status( 400 ).json( { error: "Poll ID is required for voting operation" } );

  // Here we find the poll with the given pollId and update it
  Poll.findByIdAndUpdate( pollId, { $push: { votes: userId } }, { new: true } )
    .then( poll => {
      if ( !poll ) return res.status( 400 ).json( { error: "Something went wrong. Voting was not successful." } );
    } )
    .catch( err => {
      res.json( { error: err.message } );
    } );
}

// Allows users to like a poll with the given ID
exports.likePoll = ( req, res ) => {
  const { userId, pollId, usertype } = req.params;

  // We check whether the user type is available in the request params. If not, return the error message
  if ( usertype !== "user" ) return res.status( 400 ).json( { error: "Only users can like a poll" } );
  // We check for the user ID in the rquest params. If not provided, return the error message
  if ( !userId ) return res.status( 400 ).json( { error: "No user Id provided. Ensure you're correctly logged in" } );
  // We check if the poll ID is in the request params. If not, return the error message
  if ( !pollId ) return res.status( 400 ).json( { error: "Poll ID is required for voting operation" } );

  // Here we find the poll with the given pollId and update it
  Poll.findByIdAndUpdate( pollId, { $push: { likes: userId } }, { new: true } )
    .then( poll => {
      if ( !poll ) return res.status( 400 ).json( { error: "Something went wrong. Voting was not successful." } );
    } )
    .catch( err => {
      res.json( { error: err.message } );
    } );
}

// Updates poll photo
exports.uploadPhoto = ( res, req ) => {
  const { usertype, pollId } = req.params;
  if ( usertype !== "admin" ) return res.status( 403 ).json( {
    error: "Unathorized access. Only admin can delete a poll"
  } );
  if ( !pollId ) return res.status( 400 ).json( {
    error: "The id of the discussion to be deleted is required"
  } );

  // Assigned the path to a new constant @photo
  const photo = req.file.path;
  Poll.findByIdAndUpdate( pollId )
    .then( poll => {
      if ( !poll ) return res.status( 400 ).json( { error: "Poll not found." } )
      // set the photo field to the file path
      poll.photo = photo;
      // save update to the poll model
      return poll.save();
    } )
    .catch( err => {
      res.json( { error: err.message } );
    } );
}

// We fetch all poll here
exports.fetchAllPoll = (req, res) => {
  Poll.find( {} )
    .populate( "createdBy", "firstName lastName email")
    .then(poll => {
      if (!poll) return res.status(400).json({ error: "No records found" });
      res.json(poll);
    })
    .catch(err => {
      res.json({ error: err.message });
    });
}

// We delete a poll with @pollId 
exports.deletePoll = (req, res) => {
  const { pollId, usertype } = req.params;
  if ( usertype !== "admin" ) return res.status( 403 ).json( { error: "Unathorized access. Only admin can delete a poll" } );
  if (!pollId) return res.status(400).json({ error: "The id of the discussion to be deleted is required" });
  Poll.findByIdAndRemove(pollId)
    .then(poll => {
      res.json({ success: "Poll successfully deleted"})
    })
    .catch(err => {
      res.json({ error: err.message });
    });
}

