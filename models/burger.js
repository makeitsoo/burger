var orm = require("../config/orm.js");

// * create the code that will call the ORM functions using burger specific input for the ORM.

// * Export at the end of the `burger.js` file.



var burger = {
	selectAll: function() {
		orm.selectAll();
	},
	insertOne: function() {
		orm.insertOne();
	},
	updateOne: function() {
		orm.updateOne();
	}
};







module.exports = burger;