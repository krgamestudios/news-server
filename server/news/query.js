const { articles } = require('../database/models');

//the query function that can be reused
const query = (ascending, titlesOnly) => async (req, res) => {
	console.log(ascending, titlesOnly);
	console.log(req.params);

	//specific search
	if (req.params.id && typeof(parseInt(req.params.id)) === 'number') {
		const result = await articles.findOne({
			attributes: [
				'index', 'title', 'author', ...(!titlesOnly ? ['body', 'edits'] : [])
			],
			order: [
				['index', ascending ? 'ASC' : 'DESC']
			],
			offset: parseInt(req.params.id),
			limit: 1
		});

		return res.status(200).json(result);
	}

	//default search
	else {
		const result = await articles.findAndCountAll({
			attributes: [
				'index', 'title', 'author', ...(!titlesOnly ? ['body', 'edits'] : [])
			],
			order: [
				['index', ascending ? 'ASC' : 'DESC']
			],
			count: req.params.limit || process.env.QUERY_LIMIT || 999
		});

		return res.status(200).json(result.rows || result);
	}
};

module.exports = query;