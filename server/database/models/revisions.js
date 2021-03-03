const Sequelize = require('sequelize');
const sequelize = require('..');

const articles = require('./articles');

sequelize.sync();

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
	}
});

//relationships
articles.hasOne(revisions, { as: 'original' });

sequelize.sync();

module.exports = revisions;