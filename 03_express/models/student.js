const mongoose = require("mongoose")
const Schema = mongoose.Schema

const student = new Schema({
    full_name: String,
    id: Number
})

module.exports = mongoose.model("Students", student)