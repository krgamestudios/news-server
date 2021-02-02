//environment variables
require('dotenv').config();

//create the server
const express = require('express');
const app = express();
const server = require('http').Server(app);
const bodyParser = require('body-parser');
const cors = require('cors');

//config
app.use(bodyParser.json());
app.use(cors());

//database connection
const database = require('./database');

//access the news
app.use('/news', require('./news'));

//error on access
app.get('*', (req, res) => {
	res.redirect('https://github.com/krgamestudios/news-server');
});

//startup
server.listen(process.env.WEB_PORT || 3100, (err) => {
	console.log(`listening to localhost:${process.env.WEB_PORT || 3100}`);
});
