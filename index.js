const express = require("express")
const http = require("http")
require("dotenv").config()
const mongoose = require("mongoose")
const { getStaffMemberStream } = require("./controllers/auth.controller")
const authRoutes = require("./routes/auth.routes")
const subscribeRoutes = require("./routes/subscribe.routes")
const { initializeSocket } = require("./utils/socket")
const app = express()
const server = http.createServer(app)

app.use(express.json());

mongoose.connect("mongodb+srv://aimecyuzuzo:dnoH7IVYr2XANPlW@cluster0.uwzwt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
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


module.exports = { app, server };
