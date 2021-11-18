const Sequelize = require('sequelize');
const sequelize = require('..');

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

	originalIndex: {
		type: Sequelize.INTEGER(11),
		default: null
	}
});

//relationships
sequelize.sync();

module.exports = revisions;