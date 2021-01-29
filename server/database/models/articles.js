const Sequelize = require('sequelize');
const sequelize = require('..');

module.exports = sequelize.define('articles', {
	index: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		unique: true
	},

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

	edits: {
		type: Sequelize.INTEGER(11),
		defaultValue: 0
	}
});
