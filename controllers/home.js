const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {

	res.render('index', {});

}) //end of homepage get route	

router.get('/login', (req, res) => {
	res.render('login', {message: '', logged: req.session.logged, username: req.session.username});
}) // end of login get route

router.get('/account', (req, res) => {
	res.render('newaccount', {message: ''});
}) // end of account get route

router.post('/account', (req, res) => {

	User.findOne({username: req.body.username}, (err, user) => {
		if(err){
			res.send(err)
		} else{
			if(!user){
				const password = req.body.password;
				const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

				const userDBentry = {};
				userDBentry.username = req.body.username;
				userDBentry.password = passwordHash;

				User.create(userDBentry, (err, user) => {
					if(err){
						res.send('error creating user')
					} else{
						req.session.logged = true;
						req.session.username = user.username;
						res.redirect('/login');
					}
				})

			} else {
				res.render('newaccount', {message: 'Username is taken, please try again'})
			}
		}
	})

}) // end of account post route

router.post('/login', (req, res) =>{

	User.findOne({username: req.body.username}, (err, user) => {
    if(err){
      res.redirect('/login')
    } else {
      console.log(user)
            if(user){

                    if(bcrypt.compareSync(req.body.password, user.password)){
                      req.session.logged = true;
                      req.session.username = user.username;
                      res.redirect('/login')
                    } else {
                      res.render('login', {	logged: req.session.logged})
                    }

            } else {
              res.render('login', {	logged: req.session.logged,
              						message: 'login incorrect'})
            }
   		}
   	})
}) // end of login post route

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});





module.exports = router;