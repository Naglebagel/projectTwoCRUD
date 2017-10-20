const express = require('express');
const router = express.Router();
const TV = require('../models/tvSchema')
const TVReview = require('../models/tvReviews')

router.get('/', (req, res) =>{
	TV.find((err, shows)=> {
		TVReview.find((err, reviews)=>{
		res.render('tvshows/index', {tv: shows,
								tvreviews: reviews})
	})
	})
})

router.post('/', (req,res) =>{
		TV.create(req.body, (err, show)=>{
			res.redirect('/tv')
		})
	})
router.get('/new', (req, res) =>{
	res.render('tvshows/new', {});
})

router.get('/:id', (req,res) =>{
	TV.findById((req.params.id), (err, show)=>{
			res.render('tvshows/show', {
										show: show,
										TVReview
		})
	})
})

router.post('/create', (req, res)=>{
	TVReview.create((req.body, (err, newReview)=>{
		TV.findById((req.body.titleId), (err, currentShow)=>{
			currentShow.reviews.push(req.body);
			currentShow.save();
			res.redirect('/tvshows/' + req.body.titleId)
		})
	}))
})

router.delete('/:id', (req, res) => {
	TV.findByIdAndRemove(req.params.id, (err, show) => {
		const reviewIds = [];
		for(let i = 0; i < show.reviews.length; i++){
			reviewIds.push(show.reviews[i].id)
		}
		TVReview.remove({
			_id: {$in: reviewIds}
		}, (err, data) =>{
			res.redirect('/tvshows')
			})
		})
	})
// })



 

module.exports = router;