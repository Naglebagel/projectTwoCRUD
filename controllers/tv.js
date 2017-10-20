const express = require('express');
const router = express.Router();
const TV = require('../models/tvSchema')

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
										show: show
		})
	})
})

router.put('/:id', (req, res) => {
	TV.findByIdAndUpdate(req.params.id, req.body, (err, updatedShow)=>{
			res.redirect('/tv/' + req.params.id)
		})      
})
 

module.exports = router;