
var express = require("express");

var router = express.Router();

// Import the model (adoptme.js) to use its database functions.
var adoptme = require("../models/adoptme.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res){
  adoptme.selectAll(function(data) {
      var hdbrsObj = {
          animal: data
      };
      console.log(hdbrsObj);
      res.render("index", hdbrsObj)
  });
  
router.get("/favorites", function(req, res){
  adoptme.selectAll(function(data){
    var hdbrsObj = {
      animal:data
    };
    res.render("favorites",hdbrsObj)
  })
})

router.post("/api/animal", function(req, res){
  adoptme.insertOne(
      ["image", "name", "url"],
      [req.body.image, req.body.name, req.body.url],
      function(result) {
          res.json({id: result.insertId});
      }
  );
});



});





// Export routes for server.js to use.
module.exports = router;
