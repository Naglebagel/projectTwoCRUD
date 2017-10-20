const express = require('express');
const router = express.Router();
const Movie = require('../models/movieSchema')
const MovieReview = require('../models/movieReviews')

router.get('/', (req, res) =>{
	Movie.find((err, movies)=> {
		MovieReview.find((err, reviews)=>{
		res.render('movie/index', {movie: movies,
								moviereviews: reviews})
	})
	})
})

router.post('/', (req,res) =>{
		Movie.create(req.body, (err, movie)=>{
			res.redirect('/movie')
		})
	})
router.get('/new', (req, res) =>{
	res.render('movie/new', {});
})

router.get('/:id', (req,res) =>{
	Movie.findById((req.params.id), (err, movie)=>{
		// console.log(movie.imageLink);
			res.render('movie/show', {
										movie: movie,
										MovieReview
		})
	})
})

router.get('/:id/edit', (req, res) => {
	Movie.findById(req.params.id, (err, movie) => {
		res.render('movie/edit', {movie: movie})
	})
})

router.put('/:id/edit', (req, res) => {
	console.log(req.params.id)
	Movie.findByIdAndUpdate(req.params.id, req.body, (err, movie) => {
		if(err){
				res.send('error updating author');
			} else{
				res.redirect('/movie');
			};
	}); // end of mongo query
});

router.post('/create', (req, res)=>{
	MovieReview.create((req.body, (err, newReview)=>{
		Movie.findById((req.body.titleId), (err, currentMovie)=>{
			currentMovie.reviews.push(req.body);
			currentMovie.save();
			res.redirect('/movie/' + req.body.titleId)
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
			res.redirect('/movie')

			})
		})
})
module.exports = router;