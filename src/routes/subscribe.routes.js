const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { subscribeToStaffMember, subscribeToAllStaffMembers } = require("../controllers/staffmembers.controller");

const router = express.Router();

router.get("/staffmember/:id", subscribeToStaffMember);
router.get("/allstaffmembers", authMiddleware, subscribeToAllStaffMembers);

module.exports = router;