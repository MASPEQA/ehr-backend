const mongoose = require('mongoose');

const TreatmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    clinician: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "StaffMember",
        required: true
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true
    },
    notes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Note"
    },
    price: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    }
}, { timestamps: true })