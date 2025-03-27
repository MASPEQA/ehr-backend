const mongoose = require('mongoose');

const TreatmentSchema = new mongoose.Schema({
    initiator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "StaffMember",
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
    serviceContract: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ServiceContract",
        required: true
    },
    notes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Note"
    },
    supervisors: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "StaffMember",
        default: []
    },
    invoice: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Invoice",
        required: true
    },
    approvealTimestamp: {
        type: Date,
        required: true
    }
}, { timestamps: true })