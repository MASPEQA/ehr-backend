const mongoose = require("mongoose")

const DepartmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: String,
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "StaffMember"
    },
    parentDeparrment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department"
    }
})


module.exports = mongoose.model("Department", DepartmentSchema, "departments")