mysql = require("mysql");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "",
	database: "burgers_db"
});

connection.connect(function(err) {
	if (err) {
		throw err;
		console.error(err)
	}
	console.log("------------------------------------");
	console.log("CONNECTED TO BURGERS_DB on PORT 3306");
	console.log("------------------------------------");
	start();
});


function start() {
	console.log("START FUNCTION")


	// terminate connection to SQL db
	connection.end();
};

