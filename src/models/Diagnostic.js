const mongoose = require("mongoose");

const DiagnosticSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    notes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Note"
    },
}, { timestamps: true })

module.exports = mongoose.model("Diagnostic", DiagnosticSchema, "diagnostics")