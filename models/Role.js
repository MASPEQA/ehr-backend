const mongoose = require("mongoose")

const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        enum: ['Admin', 'Biller', 'Finance-View', 'Finance-Edit', 'Clinician', 'Scheduler', 'PracticeAdmin'],
        required: true,
    },
})


module.exports = mongoose.model("Role", RoleSchema, "roles")