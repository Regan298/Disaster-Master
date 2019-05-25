const fs = require('fs');
var ip = require('ip');
var opn = require('opn');
var mysql = require('mysql');
var express = require('express');
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const { Worker, isMainThread, parentPort } = require('worker_threads');
const fileUpload = require('express-fileupload');
app.use(fileUpload());
var simFile;


const simData = {
    ready: false,
    title: "Sebadoah"
};




var ngoUsers = [];


const worker = new Worker('./autoevents.js');

app.use(express.static('resources'));

app.get('/', function (req, res) {
    console.log('request: ' + req.url);
    res.sendFile(__dirname + '/HQ.html');
});


app.get('/ngo', function (req, res) {
    console.log('request: ' + req.url);
    res.sendFile(__dirname + '/trainee.html');
});

app.post('/upload', function (req, res) {

    //TODO: Suss File Properly
    if (req.files) {

        console.log(req.files.simFile);
        simFile = req.files.simFile;
       simData.ready = true;

    }

})



http.listen(80, function () {
    console.log('running');
});


var hostIP = ip.address();
opn('http://' + hostIP);

var host = {
    ip: hostIP,
    name: 'overseer'
}




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

                io.emit('ngoList', {ngoUsers});
            }


        }

    });

    if(simData.ready){
        console.log("REAdy");
        io.emit('simState', {simData});
    } else {
        console.log(simData.state);
        io.emit('simState', {simData});
    }


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

runSim(100000);

function runSim(endSimTime) {
	worker.on('message', (msg) => {
		console.log(msg);
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