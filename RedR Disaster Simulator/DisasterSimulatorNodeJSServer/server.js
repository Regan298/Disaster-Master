var http = require('http');
var ip = require('ip');
var opn = require('opn');
var fs = require('fs');
var mysql = require('mysql');

var ipAdd = ip.address();
opn('http://'+ipAdd+'/landing');

//console.dir (ip.address());

http.createServer(function (req, res) {
	console.log('request: ' + req.url);
if(req.url === '/landing')	{		
	fs.readFile('index.html', function(err, data){
  	res.writeHead(200, {'Content-Type': 'text/html'});
  	res.write(data);
  	res.end();
});
}

if(req.url === '/trainee'){
	fs.readFile('trainee.html', function(err, data){
  	res.writeHead(200, {'Content-Type': 'text/html'});
  	res.write(data);
  	res.end();
  });
}

if(req.url === '/overseer'){
	fs.readFile('overseer.html', function(err, data){
  	res.writeHead(200, {'Content-Type': 'text/html'});
  	res.write(data);
  	res.end();
  });

}

}).listen(80);

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});