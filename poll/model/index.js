const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const pollSchema = new Schema({
  
  name: {
    type: String,
    required: [ true, "Please provide the name of the author" ]
  },
  comment: { 
    type: String,
    required: [ true, "You must provide the message" ]
  },
  votes: [ { type: ObjectId, ref: "User" } ],
  likes: [ { type: ObjectId, ref: "User" }],
  tags: [ {
    type: String,
    enum: [ "education", "fashion", "music", "sport", "style" ],
    default: "education"
  }],
  createdBy: {
    type: String,
    required: [ true, "The creator ID is needed" ]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

pollSchema.index( { name: 1 }, { unique: true } );
const Discussion = mongoose.model("Discussion", discussionSchema);

exports.Discussion = Discussion;
