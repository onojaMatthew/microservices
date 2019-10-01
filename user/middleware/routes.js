const userRoutes = require("../routes");
const adminRoutes = require("../admin/routes");

module.exports = (app) => {
  app.use("/user", userRoutes);
  app.use("/user", adminRoutes);
}