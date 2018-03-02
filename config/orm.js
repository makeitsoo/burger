// technically this is a query builder - not true ORM

// requires connection to MySQL
var connection = require("./connection.js");

// Helper function for SQL syntax.
	// If need to pass 3 values into the mySQL query.
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

	for (var key in ob) {
		if (ob.hasOwnProperty(key))
			arr.push(key + '=' + ob[key]);
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

			cb(res);
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
				return result.status(500).end();
			}

			cb(result);
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
				return result.status(500).end();
			}
			else if (result.changedRows === 0) {
				return result.status(404).end();
			}
			cb(result);

			console.log("---------------------");
		});
	},
	deleteOne: function (table, condition, cb) {
		var qs = 'DELETE FROM ' + table;
		qs += ' WHERE ';
		qs += condition;
    	console.log(qs);

		connection.query(qs, function (err, result) {
			if (err) throw err;
			cb(result);
		});
	}
}

module.exports = orm;


