const mongoose = require("mongoose")
const Schema = mongoose.Schema

const portfolio = new Schema({
    name: String,
    image: String
})

module.exports = mongoose.model("Portfolios", portfolio)