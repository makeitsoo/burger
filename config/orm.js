var mysql = require("mysql");
var connection = require("./connection.js");


// call selectAll -- uncomment to test
// orm.selectAll();


// orm object contains all methods for handling MySQL queries
var orm = {
	selectAll: function() {
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
			connection.end();
		});
	},
	insertOne: function() {
		connection.query("INSERT INTO burgers (burger_name) VALUES (?);",[req.body.burger_name], function(err, result) {
			if (err) {
				return res.status(500).end();
			}
			// send back ID, Name, and devoured of inserted record
			res.json({ id: result.id })
				// console.log(res);
				// console.log(result);
				console.log("---NEW RECORD INSERTED---")
				console.log("BurgerID: " + result.id + " || Burger: " + result.burger_name + " || Devoured? " + result.devoured);
				// console.log(res);
			console.log("---------------------");
			connection.end();
		});
	},
	updateOne: function() {
		connection.query("UPDATE burgers SET burger_name = ? WHERE id = ?;", [req.body.burger_name, req.params.id], function(err, result) {
			if (err) {
				return res.status(500).end();
			}
			else if (result.changedRows === 0) {
				return res.status(404).end();
			}
			// console.log(res);
			// console.log(result);
			res.status(200).end();
			console.log("---------------------");
			connection.end();
		});
	}
}

module.exports = orm;


