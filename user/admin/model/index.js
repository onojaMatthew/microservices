const mongoose = require("mongoose");
const { Schema } = mongoose;
const jwt = require("jsonwebtoken");

const adminSchema = new Schema({
  firstName: { 
    type: String
  },
  lastName: { 
    type: String 
  },
  email: { type: String, required: [ true, "Admin must have an email" ], unique: true },
  password: { 
    type: String, 
    required: [ true, "Password is needed for an admin account" ] 
  },
  role: { 
    type: String, 
    enum: [ "admin" ], default: "admin" 
  },
  userType: { 
    type: String, 
    enum: [ "admin", "tenant" ], default: "admin"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

adminSchema.methods.generateToken = function() {
  const token = jwt.sign({ 
    _id: this._id, 
    email: this.email, 
    role: this.role, 
    userType: this.userType 
  }, process.env.JWT_SECRET_DEAL);
  return token;
}

const Admin = mongoose.model("Admin",  adminSchema);

exports.Admin = Admin;