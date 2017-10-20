const mongoose = require("mongoose");

const tvSchema = new mongoose.Schema({
	title: String,
	imageLink: String,
	description: String,
	reviews: [{review:String}]
})

module.exports = mongoose.model("TV", tvSchema)

