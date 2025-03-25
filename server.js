require("dotenv").config()
const app = require("./app")
const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://aimecyuzuzo:dnoH7IVYr2XANPlW@cluster0.uwzwt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log("Connected to MongoDB")
        app.listen(3050, () => {
            console.log("Server is running on port 3050")
        })
    })
    .catch(err => {
        console.error(err)
    })
