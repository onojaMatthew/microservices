const mongoose = require("mongoose");
const { Schema } = mongoose;

const tenantSchema = new Schema({
  // email: {
  //   type: String,
  //   // required: [ true, "Email is required to complete registration " ],
  //   // unique: true
  // },
  // password: {
  //   type: String,
  //   // required: [ true, "Password is required for registration" ]
  // },
  // firstName: { type: String },
  // lastName: { type: String },
  members: [{
    // email: { type: String, unique: true },
    fullName: { type: String },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  logo: {
    type: String
  },
  domainName: {
    type: String
  },
  domainNameSet: {
    type: Boolean,
    default: false
  }
});

const Tenant = mongoose.model("Tenant", tenantSchema);

exports.Tenant = Tenant;
