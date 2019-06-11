const Sequelize = require('sequelize')
const db = require('../db')

const Animal = db.define('animal', {
	name:{
		type: Sequelize.STRING,
		allowNull: false
	},
	imageUrl:{
		type: Sequelize.STRING,
		defaultValue: ""
	},
	description:{
		type: Sequelize.TEXT,
	},
	species: {
		type: Sequelize.STRING,
		allowNull: false
	},
	//number of minutes 
	timeUnit:{
		type: Sequelize.INTEGER,
		defaultValue: 60
	},
	pricePerTimeUnit: {
		type: Sequelize.FLOAT,
		allowNull: false
	},
})

module.exports = Animal