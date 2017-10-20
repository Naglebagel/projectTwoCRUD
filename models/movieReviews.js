const mongoose = require("mongoose");
const Movie = require('./movieSchema')

const MovieReviewSchema = new mongoose.Schema({
	titleId: String,
	body: String
})

module.exports = mongoose.model("MovieReview", MovieReviewSchema)