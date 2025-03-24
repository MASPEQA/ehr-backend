const express = require("express");
const { signIn, addStaffMember, refreshToken } = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/createaccount", (req, res) => {
    res.send("Create An Account");
});

router.post("/signin", signIn);
router.post("/refresh-token", refreshToken);
router.post("/create-staff-member", authMiddleware, addStaffMember)

module.exports = router;