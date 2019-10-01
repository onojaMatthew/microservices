const discussionRoutes = require("../routes");

module.exports = (app) => {
  app.use("/discussion", discussionRoutes);
}