const mongoose = require("mongoose");
const TVReview = require('./tvReviews')


const TVSchema = new mongoose.Schema({
	title: String,
	imageLink: String,
	videoLink: String,
	description: String,
	reviews: [TVReview.schema]
})

module.exports = mongoose.model("TV", TVSchema)

