const { Op } = require('sequelize');
const { articles, revisions } = require('../database/models');
const markdownIt = require('markdown-it')();

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
		return res.status(500).send('Failed to update non-existing record');
	}

	//store the revision
	await revisions.upsert({
		title: record.title,
		author: record.author,
		body: record.body,
		rendered: record.rendered,
		originalIndex: record.index
	});

	//update the data
	await articles.update({
		title: req.body.title || record.title,
		author: req.body.author || record.author,
		body: req.body.body || record.body,
		rendered: markdownIt.render(req.body.body) || record.rendered,
		edits: record.edits + 1
	}, {
		where: {
			index: req.params.id
		}
	});

	return res.status(200).end();
};

module.exports = route;