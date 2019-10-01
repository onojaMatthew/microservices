const mongoose = require("mongoose");
const { Schema } = mongoose;

const discussionSchema = new Schema({
  
  owner: {
    type: String,
    required: [ true, "Please provide the name of the author" ]
  },
  comment: { 
    type: String,
    required: [ true, "You must provide the message" ]
  },
  createdBy: {
    type: String,
    required: [ true, "The creator ID is needed" ]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Discussion = mongoose.model("Discussion", discussionSchema);

exports.Discussion = Discussion;
