const express = require('express');
const router = express.Router();
const TV = require('../models/tvSchema')
const TVReview = require('../models/tvReviews')

router.get('/', (req, res) =>{
	TV.find((err, shows)=> {
		res.render('tv/index', {tv: shows})
	})
})

router.post('/', (req,res) =>{
		TV.create(req.body, (err, show)=>{
			res.redirect('/tv')
		})
	})
router.get('/new', (req, res) =>{
	res.render('tv/new', {});
})

router.get('/:id', (req,res) =>{
	TV.findById((req.params.id), (err, show)=>{
			res.render('tv/show', {
										show: show,
										TVReview
		})
	})
})

// router.post('/create', (req, res)=>{
// 	TVReview.create((req.body, (err, newReview) =>{
// 		TV.findById((req.body.titleId, (err, show)=>{
// 			show.reviews.push(newReview);
// 			show.save();
// 			res.redirect('/tv/')
// 		})
// 	})
// })
router.post('/create', (req, res)=>{
	TVReview.create((req.body, (err, newReview)=>{
		TV.findById((req.body.titleId), (err, currentShow)=>{
			currentShow.reviews.push(req.body);
			currentShow.save();
			res.redirect('/tv/')
		})
	}))
})




// router.put('/:id', (req, res) => {
// 	TV.findByIdAndUpdate(req.params.id, req.body, (err, updatedShow)=>{

		
// 			res.redirect('/tv/' + req.params.id)
// 		})      
// })
 

module.exports = router;