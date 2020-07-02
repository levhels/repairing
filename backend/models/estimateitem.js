const mongoose = require("mongoose");

let Schema = new mongoose.Schema({
    estimatename: String,
	user: String,
    work: String,
    amount: Number,
    price: Number
})

module.exports = mongoose.model('EstimateItem', Schema);