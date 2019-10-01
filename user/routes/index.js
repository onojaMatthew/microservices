const express = require("express");
const { signup, signin, signout } = require("../controller");
const router = express.Router();

router.post('/signup/:userType', signup);
router.post("/signin", signin);
router.get('/signout', signout);

module.exports = router;