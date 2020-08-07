var express = require("express");

var router = express.Router();

// Import the model (adoptme.js) to use its database functions.
var cat = require("../models/adoptme.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  adoptme.all(function(data) {
    var hbsObject = {
      animal: data
    };
    console.log(hbsObject);
   // should it be "favorites" ------- res.render("index", hbsObject);   
  });
});

router.post("/api/animal", function(req, res) {
  animal.create([
    "image", "name","url"       
  ], [
    req.body.image, req.body.name, req.body.url     
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/animal/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  animal.update({
    // not sure here -----sleepy: req.body.sleepy      
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/animal/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  animal.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;