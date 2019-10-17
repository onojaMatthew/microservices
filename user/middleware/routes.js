const userRoutes = require( "../routes" );
const error = require("../config/error")

module.exports = (app) => {
  app.use( "/api/v1/user", userRoutes );
  app.use( error );
}