const { articles } = require('../database/models');

const route = async (req, res) => {
	//check the key
	if (req.body.key != process.env.QUERY_KEY) {
		return res.status(401).json({ ok: false, error: 'invalid key' });
	}

	//upsert the data
	const [instance, created] = await articles.upsert({
		title: req.body.title,
		author: req.body.author,
		body: req.body.body
	});

	if (!created) {
		return res.status(500).json({ ok: false, error: 'failed to create record' });
	}

	//BUGFIX
	const result = await articles.findOne({
		order: [
			['index', 'DESC']
		]
	});

	return res.status(200).json({
		ok: true,
//		index: instance.get('index')
		index: result.index
	});
};

module.exports = route;