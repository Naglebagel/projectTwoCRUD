const mongoose = require("mongoose");
const TV = require('./tvSchema')

const TVReviewSchema = new mongoose.Schema({
	titleId: String,
	body: String
})

module.exports = mongoose.model("TVReview", TVReviewSchema)