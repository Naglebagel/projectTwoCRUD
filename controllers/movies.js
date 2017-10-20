const express = require('express');
const router = express.Router();
const Movie = require('../models/movieSchema')

router.get('/', (req, res) =>{
	Movie.find((err, movies)=> {
		res.render('movies/index', {movie: movies})
	})
})

module.exports = router;