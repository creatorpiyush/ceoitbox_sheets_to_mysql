const mysql = require("mysql");

var con = mysql.createConnection({
  host: "database-do-user-10312936-0.b.db.ondigitalocean.com",
  user: "doadmin",
  password: "AVNS_BvBYzrF4U6SJbmP",
  database: "dummy",
  port: "25060",
  sslmode: "require",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = con;
