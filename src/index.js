const express = require("express")
const http = require("http")
require("dotenv").config()
const mongoose = require("mongoose")

// Routes
const authRoutes = require("./routes/auth.routes")
const subscribeRoutes = require("./routes/subscribe.routes")
const patientRoutes = require("./routes/patient.routes")
const staffMemberRoutes = require("./routes/staffmember.routes")


const { initializeSocket } = require("./utils/socket")
const app = express()
const server = http.createServer(app)

app.use(express.json());
const port = 3050

mongoose.connect("mongodb+srv://aimecyuzuzo:7vr4XTwc2PJRqWu0@cluster0.uwzwt.mongodb.net/ehr?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log("Connected to MongoDB")
        initializeSocket(server)
        server.listen(port, () => {
            console.log("Server is running on port 3050")
        })
        })
    .catch(err => {
        console.error(err)
    })


app.use("/auth", authRoutes);
app.use("/subscribe", subscribeRoutes)
app.use("/patient", patientRoutes)
app.use("/staffmember", staffMemberRoutes)


module.exports = { 
    app,
    server,
};
