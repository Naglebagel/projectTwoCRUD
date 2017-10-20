const express = require('express');
const router = express.Router();
const User = require('../models/user')

router.get('/', (req, res) => {

	User.find((err, registeredUser)=>{
	res.render('index', {});

})

router.get('/login', (req, res) => {
	res.render('login', {});
})

router.get('/account', (req, res) => {
	res.render('newaccount', {});
})

router.post('/account', (req, res) => {
	User.create(req.body, (err, user) => {
		res.redirect('/login')
		console.log(user);
		console.log(req.body);
	})

})
})
router.post('/login', (req, res) =>{
	User.create(req.body, (err, User)=>{
	res.redirect('/')

	})
})




module.exports = router;