const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');


require('./db/db');

const watchedController = require('./controllers/watched');
const homeController = require('./controllers/home');
const toWatchController = require('./controllers/toWatch');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));

app.use('/watched', watchedController);
app.use('/toWatch', toWatchController);
app.use('/', homeController);


app.use(express.static('public'));


app.listen(3000, () => {
	console.log('listening on port 3000');
});