const express = require("express")
const http = require("http")
require("dotenv").config()
const mongoose = require("mongoose")

// Routes
const authRoutes = require("./src/routes/auth.routes")
const subscribeRoutes = require("./src/routes/subscribe.routes")
const patientRoutes = require("./src/routes/patient.routes")
const staffMemberRoutes = require("./src/routes/staffmember.routes")


const { initializeSocket } = require("./src/utils/socket")
const app = express()
const server = http.createServer(app)

app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connected to MongoDB")
        server.listen(3050, () => {
            console.log("Server is running on port 3050")
            initializeSocket(server)
        })
    })
    .catch(err => {
        console.error(err)
    })


app.use("/auth", authRoutes);
app.use("/subscribe", subscribeRoutes)
app.use("/patient", patientRoutes)
app.use("/staffmember", staffMemberRoutes)


module.exports = { app, server };
