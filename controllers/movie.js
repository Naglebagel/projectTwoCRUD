const express = require('express');
const router = express.Router();
const Movie = require('../models/movie')

router.get('/', (req, res) => {
	Movie.find((err, movie) => {
		res.render('movie/index', {movie: movie});
	})
})

router.get('/new', (req, res) => {
	res.render('movie/new', {})
})

router.post('/', (req, res) => {
	Movie.create(req.body, (err, movie) => {
		res.redirect('/movie');
	})
})

router.get('/:id', (req, res) => {
	Movie.findById(req.params.id, (err, movie) => {
		res.render('movie/show', {movie: movie})
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

router.delete('/:id', (req, res) => {
	Movie.findByIdAndRemove(req.params.id, (err, movie) => {
		if(err){
				res.send('error updating author');
			} else{
				res.redirect('/movie');
			};
	})
})




module.exports = router;