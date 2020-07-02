const mongoose = require("mongoose");

let Schema = new mongoose.Schema({
    unitname: String
})

module.exports = mongoose.model('UnitItem', Schema);