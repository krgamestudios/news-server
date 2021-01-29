const Sequelize = require('sequelize');
const sequelize = require('..');

const articles = require('./articles');

const revisions = sequelize.define('revisions', {
	title: {
		type: Sequelize.TEXT,
		defaultValue: ''
	},

	author: {
		type: Sequelize.TEXT,
		defaultValue: ''
	},

	body: {
		type: Sequelize.TEXT,
		defaultValue: ''
	},

	revision: {
		type: Sequelize.INTEGER(11),
		defaultValue: 0
	}
});

//relationships
revisions.hasOne(articles, { as: 'article' });

sequelize.sync();

module.exports = revisions;