var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "nodeuser",
  password: "nodeuser@1234"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE test", function (err, result) {
  	if (err) throw err;
  	console.log("DB Created")
  });
});