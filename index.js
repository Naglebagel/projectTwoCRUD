const express = require('express');
const app = express();
const parseUrl = require('parseurl');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');


require('./db/db');


const tvController = require('./controllers/tv');
const homeController = require('./controllers/home');
const moviesController = require('./controllers/movies');
const session = require('express-session')

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));

app.use(session({
	secret: 'super duper secret string that you cant know so dont ask',
	resave: false,
	saveUninitialized: false
}))

app.use(function(req, res, next){
	if(parseUrl(req).pathname.includes('movie')){
		if(req.session.logged === true){
			next();
		} else {
		res.redirect('/account');
		}
	} else{
		next();
	}	
});

app.use(function(req, res, next){
	if(parseUrl(req).pathname.includes('tv')){
		if(req.session.logged === true){
			next();
		} else {
		res.redirect('/account');
		}
	} else{
		next();
	}	
});

app.use( function( req, res, next ) {
    if ( req.query._method === 'DELETE' ) {
        req.method = 'DELETE';
        req.url = req.path;
    }
    next(); 
});

app.use(express.static('public'));


app.use('/movie', moviesController);
app.use('/tv', tvController);

app.use('/', homeController);

app.listen(3000, () => {
	console.log('listening on port 3000');
});