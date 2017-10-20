const express = require('express');
const router = express.Router();
const Movie = require('../models/movieSchema')
const MovieReview = require('../models/tvReviews')

router.get('/', (req, res) =>{
	Movie.find((err, movies)=> {
		MovieReview.find((err, reviews)=>{
		res.render('movies/index', {movie: movies,
								moviereviews: reviews})
	})
	})
})

router.post('/', (req,res) =>{
		Movie.create(req.body, (err, movie)=>{
			res.redirect('/movies')
		})
	})
router.get('/new', (req, res) =>{
	res.render('movies/new', {});
})

router.get('/:id', (req,res) =>{
	Movie.findById((req.params.id), (err, movie)=>{
			res.render('movies/show', {
										movie: movie,
										MovieReview
		})
	})
})

router.post('/create', (req, res)=>{
	MovieReview.create((req.body, (err, newReview)=>{
		Movie.findById((req.body.titleId), (err, currentMovie)=>{
			currentMovie.reviews.push(req.body);
			currentMovie.save();
			res.redirect('/movies/' + req.body.titleId)
		})
	}))
})

router.delete('/:id', (req, res) => {
	Movie.findByIdAndRemove(req.params.id, (err, movie) => {
		const reviewIds = [];
		for(let i = 0; i < movie.reviews.length; i++){
			reviewIds.push(movie.reviews[i].id)
		}
		MovieReview.remove({
			_id: {$in: reviewIds}
		}, (err, data) =>{
			res.redirect('/movies')
			})
		})
})
module.exports = router;