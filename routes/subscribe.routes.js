const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { subscribeToStaffMember } = require("../controllers/staffmembers.controller");

const router = express.Router();

router.get("/staffmember/:id", subscribeToStaffMember);

module.exports = router;