const { User } = require("../models");
const { er } = require("../../tenant/models");
const bcrypt = require("bcrypt");

exports.signup = (req, res) => {
  const { email, password } = req.body.data;
  const { userType } = req.params;

  if (!email || !password) return res.status(400).json({ error: "Email and password are required for account sign up" });
  if (!userType) return res.status(400).json({ error: "User unknown" });
  let usertype;
  let role;
  
  User.findOne({ email })
    .then(user => {
      if (user) return res.status(400).json({ error: "User already exists" });
      return bcrypt.hash( password, 12 )
        .then( hashedPassword => {
          if ( !hashedPassword ) return res.status( 400 ).json( { error: "Something went wrong" } );
          if ( userType === "tenant" ) {
            usertype = "tenant";
            role = "tenant";
          } else {
            usertype = "admin";
            role = "admin";
          }

          let newUser = new User( {
            email,
            password: hashedPassword,
            userType: usertype,
            role
          } );
          newUser.save();
          const token = newUser.generateToken();
          res.header( "x-auth-token", token ).json( newUser );
        } );
    })
    .catch(err => {
      res.json({ error: err.message });
    });
}

exports.signin = (req, res) => {
  const { email, password } = req.body.data;
  const { userType } = req.params;

  if (!email || !password) return res.status(400).json({ error: "Email and password are required" });
  if (!userType) return res.status(400).json({ error: "Unknown user" });
  let User;

  User.findOne({ email })
    .then(user => {
      if (!user) return res.status(400).json({ error: "User does not exist" });
      return bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (!isMatch) return res.status(400).json({ error: "Invalid email or password" });
          const token = user.generateToken();
          const { _id, email, firstName, lastName, userType, role } = user;
          res.cookie("token", token, { expire: new Date() + 9999 });
          res.json({  token, user: { _id, email, userType, role }});
        });
    })
    .catch(err => {
      res.json({ error: err.message });
    });
}

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({ "message": "You have logged out successfully" });
};