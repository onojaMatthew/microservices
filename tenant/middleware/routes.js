const tenantRoutes = require( "../routes" );

module.exports = ( app ) => {
  app.use( "/tenant", tenantRoutes );
}