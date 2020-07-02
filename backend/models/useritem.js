const mongoose = require("mongoose");

let Schema = new mongoose.Schema({
    username: String,
	password: String,
    email: String,
    role: String,
    active: Boolean
})

module.exports = mongoose.model('UserItem', Schema);