const mongoose = require("mongoose");

let Schema = new mongoose.Schema({
    workname: String,
	description: String,
    category: String,
    unit: String,
    price: Number

})

module.exports = mongoose.model('WorkItem', Schema);