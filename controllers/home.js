const express = require('express');
const router = express.Router();
const User = require('../models/user')

router.get('/', (req, res) => {
	User.find((err, registeredUser)=>{
	res.render('index', {users: registeredUser});
})
})
router.post('/login', (req, res) =>{
	User.create(req.body, (err, User)=>{
	res.redirect('/')

	})
})




module.exports = router;