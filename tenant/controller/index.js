const { Tenant } = require("../models");
const axios = require("axios");

// Updates tenant's information
exports.updateTenant = (req, res) => {
  const { userType, userId } = req.params;
  const { user: { _id } } = req;
  // if (!userType || !userId) return res.status(400).json({ error: "Unknown user" });
  if (userType !== "tenant") return res.status(400).json({ error: "Only tenant is permitted here" });
  if (!userId) return res.status(400).json({ error: "User id is required" });
  if (userId !== _id) return res.status(400).json({ error: "Unauthorized user" });

  Tenant.findByIdAndUpdate(userId)
    .then(tenant => {
      if (!tenant) return res.status(400).json({ error: "No records found" });

      if (req.body.firstName) tenant.firstName = req.body.firstName;
      if (req.body.lastName) tenant.lastName = req.body.lastName;
      if (req.body.domainName) {
        tenant.domainName = req.body.domainName;
        tenant.domainNameSet = true;
      }

      tenant.save();
      res.json(tenant);
    })
    .catch(err => {
      res.json({ error: err.message });
    });
}

// Fetch all tenants for the admin
exports.fetchAllForAdmin = (req, res) => {
  const { userType } = req.params;
  const { role } = req.user;

  if (userType !== "admin") return res.status(400).json({ error: "Only admin is permitted here" });
  if (!role) return res.status(400).json({ error: "The user role is required to complete this operation" });
  if (role !== "admin") return res.status(400).json({ error: "Unthorized access" });

  Tenant.find({})
    .select("_id firstName lastName members createdAt userType domainName domainNameSet email")
    .then(tenant => {
      if (!tenant) return res.status(400).json({ error: "No records found" });
      res.json(tenant);
    })
    .catch(err => {
      res.json(err.message);
    });
}

// Create a new member for a tenant
exports.createMembers = (req, res) => {
  const { userType, tenantId } = req.params;
  const { fullName, email } = req.body;
  if (!fullName || !email) return res.status(400).json("Full name and email are required");
  if (!userType) return res.status(400).json({ error: "Unknown user" });
  if (userType !== "tenant") return res.status(400).json("Only a tenant is allowed this access");

  const member = {
    fullName,
    email
  }
  Tenant.findOneAndUpdate({ _id: tenantId }, {
    $push: { members: member }
  })
    .then(data => {
      if (!data) return res.status(400).json({ error: "Failed to update tenant" });
      res.json(data);
    })
    .catch(err => {
      res.json(err.message);
    });
}

exports.getTenant = (req, res) => {
  const { userType, userId } = req.params;
  if (userType !== "tenant") return res.status(400).json({ error: "User must be a tenant" });
  Tenant.findById(userId)
    .select("_id firstName lastName members createdAt userType domainName domainNameSet email")
    .then(tenant => {
      if (!tenant) return res.status(400).json("Tenant with the id not found");
      res.json(tenant);
    })
    .catch(err => {
      res.json(err.message); 
    });
}

// Get discussions from the discussion service
exports.getDiscussions = (req, res) => {
  const { authorIds } = req.body;
  let discussions;
  axios.post("http://localhost:3010/discussion", { authorIds })
    .then(resp => {
      res.json(resp.data);
    })
    .catch(err => {
      console.log(err.message);
    });
}


// File uploads here
exports.uploads = ( req, res, next ) => {
  const file = req.body;
  console.log(req.file)

  let tenant = new Tenant();
  tenant.logo = req.file.path;
  tenant.save( ( err, data ) => {
    if ( err ) {
      console.log( err.message, " the error message ");
      return res.status( 400 ).json( { error: err.message } );
    }
    res.json( data );
  })
  
}

// Delete a tenant with the provided Id
exports.deleteTenant = (req, res) => {
  const { userType, tenantId } = req.params;
  if (!userType) return res.status(400).json({ error: "Unknown user" });
  if (![ "admin", "tenant" ].includes(userType)) return res.status(400).json({
    error: "Only admin or tenant can delete this account"
  });
  Tenant.findByIdAndRemove(tenantId)
    .then(tenant => {
      res.json({ "message": "Tenant deleted successfully" });
    })
    .catch(err => {
      res.json(err.message);
    });
}