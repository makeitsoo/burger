var express = require("express");
// creates Express router for app
var router = express.Router();
var burger = require("../models/burger.js");

// ****** Here are all the routes needed for app ******
// ---------------------------------------------------- //

// GET route for re-routing to correct path for GET
router.get("/burgers", function(req, res) {
	res.redirect("/");
});

// GET request route for SELECT (home page route rendering index.handlebars)
router.get("/", function(req, res) {
	burger.selectAll(function(data) {
		var hbsObject = {
			burgers: data
		};
		console.log(hbsObject);
		res.render("index", hbsObject);
	});
});

// POST request route for INSERT (for creating new burger)
router.post("/burgers", function(req, res) {
	// Requires burger_name and devoured values
	var cols = ['burger_name', 'devoured'];
	var vals = [req.body.burger, req.body.devoured];
	// calls burger.insertOne function from burger.js file and inserts new record using vals from post request
	burger.insertOne(cols, vals, function(result) {
		// Redirects to home page routes upon completion
		res.redirect('/');
	});
});

// PUT request route for UPDATE (for devouring burger)
router.put("/burgers/update/:id", function(req, res) {
	var objColVals = { devoured : req.body.devoured };
	var condition = "id = " + req.params.id;;
	burger.updateOne(objColVals, condition, function() {
		res.redirect("/");
	});
});

// DELETE request route (for deleting burger)
router.delete('/burgers/update/:id', function(req, res) {
	var condition = 'id = ' + req.params.id;
	burger.deleteOne(condition, function() {
		res.redirect('/');
	});
});


// export router for server.js to use routes
module.exports = router;
