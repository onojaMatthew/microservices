const mongoose = require("mongoose");
require("dotenv").config();

module.exports = () => {
  mongoose.Promise = global.Promise;
  mongoose.connect(process.env.DB_URL, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
    .then(() => {
      console.log("Connection to database established")
    })
    .catch(err => { console.log("Connection failed ", err.message) });
}