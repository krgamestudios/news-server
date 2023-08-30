const { articles } = require('../database/models');

//the query function that can be reused
const query = (ascending, metadataOnly) => async (req, res) => {
	if (process.env.QUERY_LIMIT) {
		process.env.PAGE_SIZE = process.env.QUERY_LIMIT;
		console.warn('The use of QUERY_LIMIT is deprecated. Please use PAGE_SIZE instead.');
	}

	if (req.query.limit) {
		req.query.page_size = req.query.limit;
		console.warn('The use of the limit parameter is deprecated. Please use page_size instead.');
	}

	const PAGE_SIZE = parseInt(req.query.page_size) || parseInt(process.env.PAGE_SIZE) || 999;
	const PAGE = parseInt(req.query.page) || 1;
	const ARTICLE_ID = req.params.id ? parseInt(req.params.id) : undefined;
	const FIELDS = req.query.fields ? req.query.fields.split(',') : undefined;

	const attributes = [
		'index',
		'author',
		'createdAt',
		'edits',
		'title',
		'updatedAt',
	].concat(metadataOnly ? [] : [
		'body',
		'rendered'
	]);

	//filter out attributes that aren't requested
	const attributesToFetch = FIELDS ? attributes.filter((attr) => {
		return FIELDS.includes(attr) || attr === 'index';
	}) : attributes;

	//specific search (id is defined)
	if (typeof(ARTICLE_ID) === 'number' && !isNaN(ARTICLE_ID)) {
		const result = await articles.findOne({
			attributes: attributesToFetch,
			where: {
				index: ascending ? ARTICLE_ID : (await articles.max('index') - ARTICLE_ID) + 1,
			}
		});

		//result is null if failed to find
		return res.status(200).json(result || []);
	}

	//default search
	else {
		const result = await articles.findAndCountAll({
			attributes: attributesToFetch,
			limit: PAGE_SIZE,
			offset: Math.max((PAGE - 1) * PAGE_SIZE, 0),
			order: [
				['index', ascending ? 'ASC' : 'DESC']
			]
		});

		//result is empty array if failed to find
		return res.status(200).json(result.rows || result || []);
	}
};

module.exports = query;
