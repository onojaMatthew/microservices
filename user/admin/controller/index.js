const { Admin } = require("../model");

// Update names of admin user
exports.updateBio = (req, res, next) => {
  const { firstName, lastName } = req.body;
  if (!firstName || !lastName) return res.status(400).json({ error: "First name and last names are required" });
  Admin.findByIdAndUpdate(req.params.adminId)
    .then(admin => {
      if (!admin) return res.status(400).json({ error: "User not found" });
      if (firstName) admin.firstName = firstName;
      if (lastName) admin.lastName = lastName;
      admin.save();
      res.json(admin);
    })
    .catch(err => {
      res.json({ error: err.message });
    });
}

// Get admin by ID
exports.getAdminById = (req, res, next, id) => {
  Admin.findById(req.params.adminId)
    .select("firstName lastName email userType role _id createdAt")
    .then( admin => {
      if ( !admin ) return res.status( 400 ).json( { error: "No records found" } );
      return res.json( admin );
    
    })
    .catch(err => {
      res.json(err.message);
    });
}

// Get all admin
exports.getAdmin = (req, res) => {
  Admin.find()
    .select("firstName lastName email userType role _id createdAt")
    .then(admin => {
      if (!admin)  return res.status(400).json({ error: "No records found" });
      return res.json(admin)
    })
    .catch(err => {
      res.json(err.message);
    });
}

// Delete admin with the given ID
exports.deleteAdmin = (req, res) => {
  Admin.findByIdAndRemove(req.params.adminId)
    .then(admin => {
      console.log("inside promise")
      res.json({ "message": "Successfully deleted admin account" });
    })
    .catch(err => {
      res.json({ error: err.message });
    });
}

// file upload

