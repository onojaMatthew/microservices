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
      console.log("Connected to the database");
    })
    .catch(err => { console.log(`Failed to connect to database. ${err.message}`)});
}