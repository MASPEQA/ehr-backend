const mongoose = require("mongoose");

const ServiceContractSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    unitValue: { 
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Service", ServiceContractSchema, "services")