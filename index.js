const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');


require('./db/db');

const movieController = require('./controllers/movie');
const homeController = require('./controllers/home');
const tvController = require('./controllers/tv');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));

app.use('/movie', movieController);
// app.use('/toWatch', toWatchController);
app.use('/', homeController);

app.use( function( req, res, next ) {
    if ( req.query._method === 'DELETE' ) {
        req.method = 'DELETE';
        req.url = req.path;
    }
    next(); 
});

app.use(express.static('public'));


app.listen(3000, () => {
	console.log('listening on port 3000');
});