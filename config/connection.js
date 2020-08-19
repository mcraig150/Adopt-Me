var mysql = require("mysql");

var connection;
if (process.env.JAWSDB_URL){
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
     // DB is local on localhost
connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "civic127471",
  database: "todoagain_db"
});
}


connection.connect();
module.exports = connection;