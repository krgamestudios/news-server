const Sequelize = require('sequelize');
const sequelize = require('..');

const articles = sequelize.define('articles', {
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

sequelize.sync();

module.exports = articles;