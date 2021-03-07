const { Op } = require('sequelize');
const { articles, revisions } = require('../database/models');

const route = async (req, res) => {
	//get the existing record
	const record = await articles.findOne({
		where: {
			index: {
				[Op.eq]: req.params.id
			}
		}
	});

	if (!record) {
		return res.status(500).json('Failed to remove non-existing record');
	}

	//store the revision
	await revisions.upsert({
		title: record.title,
		author: record.author,
		body: record.body,
		originalIndex: record.index
	});

	//destroy the data
	await articles.destroy({
		where: {
			index: req.params.id
		}
	});

	return res.status(200).end();
};

module.exports = route;