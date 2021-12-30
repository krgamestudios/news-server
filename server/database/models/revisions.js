const Sequelize = require('sequelize');
const sequelize = require('..');

const revisions = sequelize.define('revisions', {
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

	rendered: {
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