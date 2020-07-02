const mongoose = require("mongoose");

let Schema = new mongoose.Schema({
    categoryname: String,
	description: String,
    parent: Number
})

module.exports = mongoose.model('CategoryItem', Schema);