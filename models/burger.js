var orm = require("../config/orm.js");

// * create the code that will call the ORM functions using burger specific input for the ORM.


var burger = {
	selectAll: function() {
		orm.selectAll();
	},
	insertOne: function(newBurg) {
		orm.insertOne();
	},
	updateOne: function(updateBurg) {
		orm.updateOne();
	}
};







module.exports = burger;