const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { addPatient } = require("../controllers/patient.controller");
const { addStaffMember } = require("../controllers/staffmembers.controller");

const router = express.Router();

router.post("/new", authMiddleware, addPatient)
router.post("/one/:id", authMiddleware, addStaffMember)

module.exports = router;