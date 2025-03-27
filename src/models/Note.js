const mongoose = require("mongoose")

const NoteSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "StaffMember",
        required: true
    },
}, { timestamps: true })

module.exports = mongoose.model("Note", NoteSchema, "notes")