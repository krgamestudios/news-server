const { Op } = require('sequelize');
const { articles } = require('../database/models');

//the query function that can be reused
const query = (ascending, metadataOnly) => async (req, res) => {
	//specific search (id is defined)
	if (req.params.id && typeof(parseInt(req.params.id)) === 'number') {
		const result = await articles.findOne({
			attributes: [
				'index', 'title', 'author', 'edits', 'createdAt', 'updatedAt', ...(!metadataOnly ? ['body'] : [])
			],
			where: {
				index: {
					[Op.eq]: ascending ? parseInt(req.params.id) : (await articles.max('index')) - parseInt(req.params.id) + 1
				}
			}
		});

		//result is null if failed to find
		return res.status(200).json(result || []);
	}

	//default search
	else {
		const result = await articles.findAndCountAll({
			attributes: [
				'index', 'title', 'author', 'edits', 'createdAt', 'updatedAt', ...(!metadataOnly ? ['body'] : [])
			],
			order: [
				['index', ascending ? 'ASC' : 'DESC']
			],
			limit: parseInt(req.query.limit) || parseInt(process.env.QUERY_LIMIT) || 999
		});

		return res.status(200).json(result.rows || result);
	}
};

module.exports = query;
