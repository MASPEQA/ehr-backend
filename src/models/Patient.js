const mongoose = require("mongoose")

const PatientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
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
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    medicalHistory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MedicalRecord" // are medical records typically stored independently? or are they stored in the patient profile?
    },
    emergencyContact: {
        name: String,
        phone: String,
        email: { // so you can just nest types? and write any type you want? i thought it were pre-defined, like required, email, name....
            type: String,
            required: false
        },
        relationship: String
    },
    isActive: {
        type: Boolean,
        required: true
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("PatientProfile", PatientSchema)