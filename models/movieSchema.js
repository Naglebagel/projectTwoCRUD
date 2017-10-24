const mongoose = require("mongoose");
const MovieReview = require('./movieReviews')

const movieSchema = new mongoose.Schema({

	title: String,
	imageLink: String,
	videoLink: String,
	description: String,
	reviews: [MovieReview.schema]

})

module.exports = mongoose.model("Movie", movieSchema)