const mongoose = require("mongoose")

const InvoiceSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true
    },
    treatments: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Treatment"
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['unpaid', 'paid'],
        required: true
    },
    notes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Note"
    },
}, { timestamps: true })

module.exports = mongoose.model("Invoice", InvoiceSchema, "invoices")
