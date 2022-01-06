const { articles } = require('../database/models');
const markdownIt = require('markdown-it')({ html: true });

const route = async (req, res) => {
	//check for missing data
	if (!req.body.title) {
		return res.status(401).end("Missing title");
	}

	if (!req.body.author) {
		return res.status(401).end("Missing author");
	}

	if (!req.body.body) {
		return res.status(401).end("Missing body");
	}

	//upsert the data
	const [instance, created] = await articles.upsert({
		title: req.body.title,
		author: req.body.author,
		body: req.body.body,
		rendered: markdownIt.render(req.body.body),
	});

	if (!created) {
		return res.status(500).send('Failed to create record');
	}

	//BUGFIX: instance doesn't have the index for some reason
	const result = await articles.findOne({
		order: [
			['index', 'DESC']
		]
	});

	return res.status(200).json({
//		index: instance.get('index')
		index: result.index
	});
};

module.exports = route;