const express = require("express");
const {
  updateTenant,
  getTenant,
  fetchAllForAdmin,
  deleteTenant,
  createMembers,
  getDiscussions,
  uploads,
} = require( "../controller" );
const upload = require( "../middleware/filesystem" );
const router = express.Router();

router.post( "/tenant/discussion", getDiscussions );
router.post( "/tenant/upload", upload.single("image"), uploads );
router.put("/tenant/member/:tenantId/:userType", createMembers);
router.get("/tenant/:userType/:userId", getTenant);
router.put("/tenant/:userType/:userId", updateTenant);
router.get("/tenant/:userType", fetchAllForAdmin);
router.delete("/tenant/:userType/:tenantId", deleteTenant);

module.exports = router;