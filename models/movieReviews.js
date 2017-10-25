const mongoose = require("mongoose");
const Movie = require('./movieSchema')

const MovieReviewSchema = new mongoose.Schema({
	titleId: String,
	rating: Number,
	body: String,
	username: String
})

module.exports = mongoose.model("MovieReview", MovieReviewSchema)