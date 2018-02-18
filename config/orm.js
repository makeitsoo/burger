var mysql = require("mysql");
var connection = require("./connection.js");

// console.log(connection);

connection.query("SELECT * FROM burgers;", function(err, res) {
	if (err) {
		throw err;
		console.error(err);
	}
	for (var i = 0; i < res.length; i++) {
		// console.log(res[i]);
		console.log("BurgerID: " + res[i].id + " || Burger: " + res[i].burger_name + " || Devoured? " + res[i].devoured);
		// console.log(res);
	}
	console.log("---------------------");
});

connection.end();