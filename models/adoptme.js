var orm = require("../config/orm.js");

var adoptme = {
  selectAll: function(cb) {
    orm.selectAll("animal", function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  insertOne: function(cols, vals, cb) {
    orm.insertOne("animal", cols, vals, function(res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller (adoptmeController.js).
module.exports = adoptme;
