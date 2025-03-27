const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { addStaffMember, getStaffMember } = require("../controllers/staffmembers.controller");

const router = express.Router();

router.post("/new", authMiddleware, addStaffMember)
router.get("/one/:id", authMiddleware, getStaffMember)

module.exports = router;