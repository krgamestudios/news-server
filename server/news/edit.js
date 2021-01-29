const { Op } = require('sequelize');
const { articles, revisions } = require('../database/models');

const route = async (req, res) => {
	//check the key
	if (req.body.key != process.env.QUERY_KEY) {
		return res.status(401).json({ ok: false, error: 'invalid key' });
	}

	//get the existing record
	const record = await articles.findOne({
		where: {
			index: {
				[Op.eq]: req.params.id
			}
		}
	});

	if (!record) {
		return res.status(500).json({ ok: false, error: 'failed to update non-existing record' });
	}

	//store the revision
	await revisions.upsert({
		title: record.title,
		author: record.author,
		body: record.body,
		originalIndex: record.index
	});

	//update the data
	await articles.update({
		title: req.body.title,
		author: req.body.author,
		body: req.body.body,
		edits: record.edits + 1
	}, {
		where: {
			index: req.params.id
		}
	});

	return res.status(200).json({
		ok: true
	});
};

module.exports = route;