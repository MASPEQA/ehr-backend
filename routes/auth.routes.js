const express = require("express");
const { signIn, refreshToken } = require("../controllers/auth.controller");

const router = express.Router();

router.post("/signin", signIn);
router.post("/refresh-token", refreshToken);

module.exports = router;