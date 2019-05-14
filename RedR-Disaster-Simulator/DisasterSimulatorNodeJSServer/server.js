var path = require('path');
var ip = require('ip');
var opn = require('opn');
var fs = require('fs');
var mysql = require('mysql');
var express = require('express');
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var message;

app.use(express.static('resources'));

app.get('/', function(req, res){  
  console.log('request: ' + req.url);    
  res.sendFile(__dirname + '/index.html');
});


app.get('/trainee', function(req, res){  
  console.log('request: ' + req.url);    
  res.sendFile(__dirname + '/trainee.html');
});

app.get('/overseer', function(req, res){  
  console.log('request: ' + req.url);    
  res.sendFile(__dirname + '/overseer.html');
});

io.on('connection', function(socket){
  socket.on('message', function(msg){
    //io.emit('message', msg);
    var latestMessage = msg;
    console.log(msg);
    saveMessage(latestMessage);

    con.query("SELECT message FROM communication", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    var res = (result[0].message);
    io.emit('message', res);
    });


  });
});
    

http.listen(80, function(){
  console.log('running');
});


var ipAdd = ip.address();
opn('http://'+ipAdd);



//console.dir (ip.address());



var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "mydb"
 
});

wait(5000);//wait for 5s for MySQL to start

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  
});

function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}


function saveMessage(latestMessage){
  console.log(latestMessage);
  var sql = "INSERT INTO communication (message) VALUES ('" + latestMessage + "') ";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("message saved");
  });
}