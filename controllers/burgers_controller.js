var express = require("express");
// creates Express router for app
var router = express.Router();
var burger = require("../models/burger.js");


// this will query ALL burgers in db
// burger.selectAll();


// Here are all the routes needed for app

// for INSERT
app.post("/new-burger", function(req, res) {
	console.log("INSERT: ", res );
	var newBurg = res;
	burger.insertOne(newBurg);
})
// for UPDATE
app.put("/update-burger", function(req, res) {
	console.log("UPDATE: ", res );
	var updateBurg = res;
	burger.updateOne(updateBurg);

})
// for SELECT
app.get("/burgers", function(req, res) {
	console.log("SELECT: ", res );
	burger.selectAll();
})



app.listen(port, function() {
  console.log("listening on port", port);
});

// export router for server.js to use
module.exports = router;
