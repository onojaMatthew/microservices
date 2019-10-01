const mongoose = require( "mongoose" );
const jwt = require( "jsonwebtoken" );
require( "dotenv" ).config();

const { Schema } = mongoose;

const userSchema = new Schema( {
  email: {
    type: String,
    required: [ true, "Email is required" ],
    unique: true,
  },
  password: {
    type: String,
    required: [ true, "Password is required" ],
  },
  userType: {
    type: String,
    enum: [ "admin", "tenant", "user" ],
    default: "user",
  },
  role: {
    type: String,
    enum: [ "admin", "tenant", "user" ],
    default: ""
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
} );

userSchema.methods.generateToken = function () {
  const token = jwt.sign( {
    _id: this._id, email: this.email, userType: this.userType, role: this.role
  }, process.env.JWT_SECRET_DEAL ) 
}

const User = mongoose.model( "User", userSchema );
exports.User = User;
