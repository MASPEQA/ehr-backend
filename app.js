const express = require("express")
const app = express()

const authRoutes = require("./routes/auth.routes")
const authMiddleware = require("./middleware/authMiddleware")

app.use(express.json())

app.get("/", authMiddleware, (req, res) => {
    res.send("Hello World")
})

app.use("/auth", authRoutes)

module.exports = app