const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const pollSchema = new Schema({
  
  name: {
    type: String,
  },
  votes: [ { type: ObjectId, ref: "User" } ],
  likes: [ { type: ObjectId, ref: "User" }],
  tags: [ {
    type: String,
    enum: [ "education", "fashion", "music", "sport", "style" ],
    default: "education"
  } ],
  photo: { type: String },
  disabled: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// pollSchema.index( { name: 1 }, { unique: true } );

const Poll = mongoose.model("Poll", pollSchema);

exports.Poll = Poll;
