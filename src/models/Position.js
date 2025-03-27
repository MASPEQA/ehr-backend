const mongoose = require("mongoose")

const PositionSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    reportsTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Position"
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department"
    },
})

module.exports = mongoose.model("Position", PositionSchema, "positions")