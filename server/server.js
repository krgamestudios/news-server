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

	//COMPATABILITY: parse the unrendered data from the database
	const markdownIt = require('markdown-it')();
	const { articles, revisions } = require('./database/models');

	const missingArticles = await articles.findAll({
		where: {
			rendered: ''
		}
	});

	const missingRevisions = await revisions.findAll({
		where: {
			rendered: ''
		}
	});

	await Promise.all(
		missingArticles.map(async ma => {
			ma.update({
				rendered: markdownIt.render(ma.body)
			}, {
				where: {
					index: ma.index
				}
			});
		})
	)
		.then(result => {if (result.length > 0) console.log('Rendered articles in HTML'); })
	;

	await Promise.all(
		missingRevisions.map(async mr => {
			mr.update({
				rendered: markdownIt.render(mr.body)
			}, {
				where: {
					index: mr.index
				}
			});
		})
	)
	.then(result => {if (result.length > 0) console.log('Rendered revisions in HTML'); })
	;
});
