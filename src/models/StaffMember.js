const mongoose = require("mongoose")

const StaffMemberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    position: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Position"
    },
    role: {
        type: [String],
        enum: ['Admin', 'Biller', 'Finance-View', 'Finance-Edit', 'Clinician', 'Scheduler', 'PracticeAdmin'],
        required: true,
    },
    country: {
        type: String
    },
    gender: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    }
    }, { timestamps: true }
)

module.exports = mongoose.model("StaffMember", StaffMemberSchema, "staffmembers")