const mongoose = require('mongoose');
const Movie = require('./movie');


const movieSchema = new mongoose.Schema({
	title: String,
	imagelink: String,
	description: String,
})

module.exports = mongoose.model('Movie', movieSchema);