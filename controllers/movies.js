const express = require('express');
const router = express.Router();
const Movie = require('../models/movieSchema')
const MovieReview = require('../models/movieReviews')

router.get('/', (req, res) =>{
	Movie.find((err, movies)=> {
		MovieReview.find((err, reviews)=>{
		res.render('movie/index', {movie: movies,
								moviereviews: reviews,
								logged: req.session.logged
			})
		})
	})
})

router.post('/', (req,res) =>{
		Movie.create(req.body, (err, movie)=>{
			res.redirect('/movie')
	})
})

router.get('/new', (req, res) =>{
	if (req.session.logged === true) {
		res.render('movie/new', {});
	} else {
		res.redirect('/login')
	}
})

router.get('/:id', (req,res) =>{
	Movie.findById((req.params.id), (err, movie)=>{
			res.render('movie/show', {
										movie: movie,
										logged: req.session.logged,
										usernameReview: req.session.username,
		})
	})
})

router.get('/:id/edit', (req, res) => {
	if (req.session.logged === true){
		Movie.findById(req.params.id, (err, movie) => {
		res.render('movie/edit', {movie: movie})
		})
	} else {
		res.redirect('/login')
	}
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

router.delete("/delete/:id", (req, res)=>{
		MovieReview.findByIdAndRemove(req.params.id, (err, review)=>{
		Movie.findOne({'reviews._id': req.params.id}, (err, foundMovie) =>{
			foundMovie.reviews.id(req.params.id).remove();
			foundMovie.save((err, data)=>{
				res.redirect('/movie/'+ req.body.titleId);
			})
		})
	})
})

router.delete('/:id', (req, res) => {
	if (req.session.logged === true) {
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
	} else {
		res.redirect('/login')
	}	
})

module.exports = router;