const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');


require('./db/db');

const tvController = require('./controllers/tv');
const homeController = require('./controllers/home');
const moviesController = require('./controllers/movies');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));

app.use('/movies', moviesController);
app.use('/tvshows', tvController);
app.use('/', homeController);


app.use(express.static('public'));


app.listen(3000, () => {
	console.log('listening on port 3000');
});