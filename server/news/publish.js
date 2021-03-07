const { articles } = require('../database/models');

const route = async (req, res) => {
	//upsert the data
	const [instance, created] = await articles.upsert({
		title: req.body.title,
		author: req.body.author,
		body: req.body.body
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