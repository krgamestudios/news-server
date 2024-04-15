//environment variables
require('dotenv').config();

//create the server
const express = require('express');
const app = express();
const server = require('http').Server(app);

//config
app.use(express.json());

//database connection
const database = require('./database');

//access the news
app.use('/news', require('./news'));

//error on access
app.get('*', (req, res) => {
	res.redirect('https://github.com/krgamestudios/news-server');
});

//startup
server.listen(process.env.WEB_PORT || 3100, async (err) => {
	await database.sync();
	console.log(`listening to localhost:${process.env.WEB_PORT || 3100}`);
	console.log(`database located at ${process.env.DB_HOSTNAME || '<default>'}:${process.env.DB_PORTNAME || '<default>'}`);
});
