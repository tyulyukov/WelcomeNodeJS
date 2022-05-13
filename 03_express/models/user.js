const mongoose = require("mongoose")
const Schema = mongoose.Schema

const user = new Schema({
    email: String,
    passwordHash: String,
    isEmailVerified: Boolean,
    avatarUrl: String,
    username: String,
})

module.exports = mongoose.model("Users", user)