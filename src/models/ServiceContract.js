const mongoose = require("mongoose");

const ServiceContractSchema = new mongoose.Schema({
    sponsor: {
        type: String,
        enum: ['rama', 'self-pay'], // compatible medical insurance companies -- to be revised
        required: true
    },
    insurer: {
        type: String, // name of the insurance company -- to be revised
        required: true
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        required: true
    },
    rate: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    prePaidSessions: {
        type: Number,
        required: true,
        min: 0
    },
    remainingSessions: {
        type: Number,
        required: true,
        min: 0
    },
}, { timestamps: true })

module.exports = mongoose.model("ServiceContract", ServiceContractSchema, "service-contracts")