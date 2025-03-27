const mongoose = require("mongoose");

const ServiceContractSchema = new mongoose.Schema({
    name: {
        type: String, // therapy, medication, etc.
        required: true
    },
    unitValue: { // price per unit -- might be a duration-based, a pill, etc.
        type: Number,
        required: true
    },
    duration: { // duration of the service in hours
        type: Number,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Service", ServiceContractSchema, "services")