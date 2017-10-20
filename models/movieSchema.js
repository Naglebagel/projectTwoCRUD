const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
	title: String,
	imageLink: String,
	description: String,
	reviews: [{	name: String,
				review: String,
				date: Date
			}]
})

module.exports = mongoose.model("Movie", movieSchema)