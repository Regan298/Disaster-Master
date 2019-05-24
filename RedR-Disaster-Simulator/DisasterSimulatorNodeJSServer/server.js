var path = require('path');
var ip = require('ip');
var opn = require('opn');
var fs = require('fs');
var mysql = require('mysql');
var express = require('express');
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const { Worker, isMainThread, parentPort } = require('worker_threads');


var ngoUsers = [];
var overseerUser;

const worker = new Worker('./autoevents.js');

app.use(express.static('resources'));

app.get('/', function (req, res) {
    console.log('request: ' + req.url);
    res.sendFile(__dirname + '/overseer.html');
});


app.get('/trainee', function (req, res) {
    console.log('request: ' + req.url);
    res.sendFile(__dirname + '/trainee.html');
});

app.get('/overseer', function (req, res) {
    console.log('request: ' + req.url);
    res.sendFile(__dirname + '/overseer.html');
});

//app.get('/ngoselect.html', function (req, res) {
//	console.log('request: ' + req.url);
//	res.sendFile(__dirname + '/ngoselect.html');
//});

http.listen(80, function () {
    console.log('running');
});


var hostIP = ip.address();
opn('http://' + hostIP);

var host = {
    ip: hostIP,
    name: 'overseer'
}

ngoUsers.push(host);
//Socket for joining

io.on('connection', function (socket) {
    //To remove placeholder chars at start of ips
    var ipCurrent;
    if (socket.handshake.address.substr(0, 7) == "::ffff:") {
        ipCurrent = socket.handshake.address.substr(7)
    }

    socket.on('join', function (msg) {
        console.log("detect user send")
        if (ipCurrent != hostIP) {

            var found = false;
            for (var i = 0; i < ngoUsers.length; i++) {
                if (ngoUsers[i].ip == ipCurrent) {
                    found = true;
                    break;
                }
            }

            if (!found) {


                var ngo = {
                    ip: ipCurrent,
                    name: msg
                }

                console.log(ngo.ip);
                console.log(ngo.name);
                ngoUsers.push(ngo);
                console.log("got here");
                io.emit('ngoList', 'cat');





            }


        }

    });

    /*socket.on('ngoList', function(msg) {
        var x = JSON.stringify(ngoUsers);
        socket.emit('ngoList', x);
    });*/

   // socket.on('ngoList', function(msg) {
    /*if(ngoUsers[0])
    console.log(ngoUsers[0].name);
    if(ngoUsers[0] != null) {
        socket.emit('ngoList', {ngoUsers});
    }*/

   // });


    socket.on('message', function(msg){
        console.log(msg);
        io.emit('message', msg);
    });

});

var pool = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "root",
	database: "simulationData",
	connectionLimit: 10
});

wait(3000);

pool.getConnection(function (err, connection) {
	if (err) throw err;
	console.log("Connected!");
});

runSim(10000);

function runSim(endSimTime) {
	worker.on('message', (msg) => {
		console.log(msg);
		/*events.forEach(function (item, index){
			console.log(item);
		});*/
	});
	worker.postMessage(endSimTime);
}

function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
}

function saveMessage(latestMessage) {
    console.log(latestMessage);
    var sql = "INSERT INTO communication (message) VALUES ('" + latestMessage + "') ";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("message saved");
    });
}