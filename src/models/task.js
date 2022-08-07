const mongoose = require("mongoose")
const Schema = mongoose.Schema

const TaskSchema = Schema({
    status: {type: String, enum: ["ready", "reserved", "delayed"]},
    MTId: Number,
    filename: String
})

module.exports = mongoose.model("Task", TaskSchema)
