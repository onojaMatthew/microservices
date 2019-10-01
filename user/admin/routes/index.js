const express = require("express");
const {
  updateBio,
  getAdmin,
  getAdminById,
  deleteAdmin,
} = require("../controller");
const auth = require("../../config/auth");

const router = express.Router();

router.get("/admin", getAdmin);
router.put("/admin/update/:adminId", auth, updateBio);
router.delete("/admin/delete/:adminId", auth, deleteAdmin);
router.get("/admin/:adminId", getAdminById);

module.exports = router;