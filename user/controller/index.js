const { User } = require("../models");
const bcrypt = require( "bcrypt" );
const axios = require( "axios" );

// Handles user acount registration
exports.signup = (req, res) => {
  const { email, password } = req.body;
  const { userType } = req.params;

  if (!email || !password) return res.status(400).json({ error: "Email and password are required for account sign up" });
  if (!userType) return res.status(400).json({ error: "User unknown" });
  let user_type;
  let role;
  
  User.findOne({ email })
    .then( user => {
      // We check if a user with the email @email is already taken, if so return the error message
      if ( user ) return res.status( 400 ).json( { error: "User already exists" } );
      // hash the new password @password with complexity of 12
      return bcrypt.hash( password, 12 )
        .then( hashedPassword => {
          // check if hashing was successful, if not return the error message
          if ( !hashedPassword ) return res.status( 400 ).json( { error: "Something went wrong" } );
          if ( userType === "user" ) {
            user_type = "user";
            role = "user";
          } else {
            user_type = "admin";
           role = "admin";
          }

          // save the new user to the user model
          let newUser = new User( {
            email,
            password: hashedPassword,
            userType: user_type,
            role
          } );
          newUser.save();
          // We generate a token for the new user
          const token = newUser.generateToken();
          
          // Set the header and return the user
          res.header( "x-auth-token", token).json( newUser );
        } );
    })
    .catch(err => {
      res.json({ error: err.message });
    });
}

// Handles user account login
exports.signin = (req, res) => {
  const { email, password } = req.body;
  const { userType } = req.params;

  // check for email and password in the req.body
  if ( !email || !password ) return res.status( 400 ).json( { error: "Email and password are required" } );

  User.findOne({ email })
    .then(user => {
      if ( !user ) return res.status( 400 ).json( { error: "User does not exist" } );
      /**
       * We compare the current password @password with the password in the database
       * if they are not the same, return the error message
      */
      return bcrypt.compare(password, user.password)
        .then(isMatch => {
          if ( !isMatch ) return res.status( 400 ).json( { error: "Invalid email or password" } );
          /**
           * We get the user token @user.generatetoken() send it with the json response
           */
          const token = user.generateToken();
          const { _id, email, firstName, lastName, userType, role } = user;
          res.cookie( "token", token, { expire: new Date() + 9999 } );
          // We respond 
          res.json({  token, user: { _id, email, userType, role }});
        });
    })
    .catch(err => {
      res.json({ error: err.message });
    });
}

/**
 * user account log out
 */
exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({ "message": "You have logged out successfully" });
};

exports.createPoll = ( req, res ) => {

  // We destructure @userId and @usertype from request params
  const { userId, usertype } = req.params;
  const { user: { _id } } = req;
  // We destructure @name from request body
  const { name } = req.body;
  // We check for the poll name in the request body. If not proveded, we return the error message
  if ( !name ) return res.status( 400 ).json( { error: "Name is not provided. A poll must have a name" } );
  // We check the user type. If it's not admin, return the error message
  if ( usertype !== "admin" ) return res.status( 400 ).json( { error: "Only an admin allowed for this operation" } );
  if ( userId !== _id ) return res.status( 400 ).json( {
    error: "Unknow user ID. Please create an account if you don't have one "
  } );

  axios.post()
}