const express = require('express');
const router = express.Router();
const User = require('../models/user')

router.get('/', (req, res) => {
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






module.exports = router;