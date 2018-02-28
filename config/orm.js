
// technically this is a simple query builder - not true ORM
// var mysql = require("mysql");
var connection = require("./connection.js");

// call selectAll -- uncomment to test
// orm.selectAll();

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";

function printQuestionMarks(num) {
	var arr = [];

	for (var i = 0; i < num; i++) {
		arr.push("?");
	}
	return arr.toString();
}

// Helper function to convert object key/value pairs to SQL
function objToSQL(ob) {
	var arr = [];

	// loop through keys and push key/val as a string into arr
	for (var key in ob) {
		var value = ob[key];
		//check to skip hidden properties
		if (Object.hasOwnProperty.call(ob, key)) {
			// if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
			if (typeof value === "string" && value.indexOf(" ") >= 0) {
				value = "'" + value "'";
			}
			arr.push(key + "=" + value);
		}
	}
	return arr.toString();
}

// orm object contains all methods for handling MySQL queries
var orm = {
	selectAll: function(tableInput, cb) {
		var qs = "SELECT * FROM " + tableInput + ";";
		connection.query(qs, function(err, res) {
			if (err) {
				throw err;
				console.error(err);
			}

			cb(result);
			// log entire table in console
			for (var i = 0; i < res.length; i++) {
				console.log("BurgerID: " + res[i].id + " || Burger: " + res[i].burger_name + " || Devoured? " + res[i].devoured);
			};
			console.log("---------------------");
			// connection.end();
		});
	},
	insertOne: function(table, cols, vals, cb) {
		var qs = "INSERT INTO " + table;

		qs += " (";
    	qs += cols.toString();
    	qs += ") ";
    	qs += "VALUES (";
    	qs += printQuestionMarks(vals.length);
    	qs += ") ";

    	console.log(qs);

		connection.query(qs, vals, function(err, result) {
			if (err) {
				return res.status(500).end();
			}

			cb(result);
			// send back ID, Name, and devoured of inserted record
			// res.json({ id: result.id })
				console.log("---NEW RECORD INSERTED---")
				console.log("BurgerID: " + result.id + " || Burger: " + result.burger_name + " || Devoured? " + result.devoured);
			console.log("---------------------");
			// connection.end();
		});
	},
	updateOne: function(table, objColVals, condition, cb) {
		var qs = "UPDATE " + table;
		qs += " SET ";
		qs += objToSQL(objColVals);
		qs += " WHERE ";
		qs += condition;
		console.log(qs);

		connection.query(qs, function(err, result) {
			if (err) {
				return res.status(500).end();
			}
			else if (result.changedRows === 0) {
				return res.status(404).end();
			}
			cb(result);

			res.status(200).end();
			console.log("---------------------");
			// connection.end();
		});
	}
}

module.exports = orm;


