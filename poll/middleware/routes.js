const pollRoutes = require( "../routes" );
const error = require( "../config/error" );

module.exports = (app) => {
  app.use( "/api/v1/poll", pollRoutes );
  app.use( error );
}