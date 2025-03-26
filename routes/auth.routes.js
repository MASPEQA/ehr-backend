const express = require("express");
const { signIn, addStaffMember, refreshToken, addPatient, getStaffMember } = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signin", signIn);
router.post("/refresh-token", refreshToken);
router.post("/create-staff-member", authMiddleware, addStaffMember)
router.post("/create-patient", authMiddleware, addPatient)

module.exports = router;