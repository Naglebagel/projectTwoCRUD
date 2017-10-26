const mongoose = require("mongoose");
const TV = require('./tvSchema')

const TVReviewSchema = new mongoose.Schema({
	titleId: String,
	rating: Number,
	body: String,
	username: String
	
})

module.exports = mongoose.model("TVReview", TVReviewSchema)