require("dotenv").config()
const app = require("./app")
const mongoose = require("mongoose")

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Connected to MongoDB")
        app.listen(3050, () => {
            console.log("Server is running on port 3050")
        })
    })
    .catch(err => {
        console.error(err)
    })