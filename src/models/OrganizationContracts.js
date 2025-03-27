mongoose = require("mongoose")

const OrganizationContractSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    services: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Service"
    },
    isActive: {
        type: Boolean,
        required: true
    }
}, { timestamps: true })