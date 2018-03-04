var mysql = require("mysql");

var connection;

// create connection to MySQL database on production server
if (process.env.JAWSDB_URL) {
	connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
	// create connection for localhost
	connection = mysql.createConnection({
		host: "localhost",
		port: 3306,
		user: "root",
		password: "",
		database: "burgers_db"
	});
};

	connection.connect(function(err) {
		if (err) {
			throw err;
			console.error(err)
		}
		console.log("------------------------------------");
		console.log("CONNECTED TO BURGERS_DB on PORT 3306");
		console.log("------------------------------------");
		// start();
	});


module.exports = connection;





