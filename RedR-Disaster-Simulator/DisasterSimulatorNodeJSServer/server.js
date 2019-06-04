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
var TimeFormat = require('hh-mm-ss');
var dateFormat = require('dateformat');
app.use(fileUpload());
var simFile;
var connection;


const simData = {
    ready: false,
    title: "Sebadoah"
};


var ngoUsers = [];


const worker = new Worker('./autoevents.js');

app.use(express.static('resources'));

app.get('/', function (req, res) {
    console.log('request:kj ' + req.url);
    res.sendFile(__dirname + '/HQConfig.html');
});

app.get('/hq', function (req, res) {
    console.log('request:kj ' + req.url);
    res.sendFile(__dirname + '/HQ.html');
});


app.get('/ngo', function (req, res) {
    console.log('request: ' + req.url);
    res.sendFile(__dirname + '/ngoConfig.html');
});

app.get('/ngoMain', function (req, res) {
    console.log('request: ' + req.url);
    res.sendFile(__dirname + '/NGO.html');
});

app.post('/upload', function (req, res) {

    //TODO: Suss File Properly
    if (req.files) {

        console.log(req.files.simFile);
        simFile = req.files.simFile;
       simData.ready = true;

    }

});

http.listen(80, function () {
    console.log('running');
});


var hostIP = ip.address();
opn('http://' + hostIP);

var host = {
    ip: hostIP,
    name: 'HQ'
};

//TO fix:

ngoUsers.push(host);

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

    //socket.emit('ngoName', ngoTemp.name);

    for(var i = 0; i < ngoUsers.length; i++){
        ngoTemp = ngoUsers[i];
        if(ngoTemp.ip == ipCurrent){
            console.log(ngoTemp.name);
            socket.emit('ngoName', ngoTemp.name);
        }
    }

    io.emit('users', {ngoUsers});

    if(simData.ready){
        console.log("REAdy");
        io.emit('simState', {simData});
    } else {
        console.log(simData.state);
        io.emit('simState', {simData});
    }


    socket.on('message', function(msg){
        var recievedMessage = {
            from: msg.message.from,
            to: msg.message.to,
            content: msg.message.content
        }
		
		//send to DB
        var d = new Date();
        var date = dateFormat(d, "HH:MM:ss")
        var sql = "INSERT INTO messages (Recipient, Sender, Time, Content) VALUES ('" + msg.message.to + "', '" + msg.message.from + "', '" + date + "', '" + msg.message.content + "') ";
        console.log(sql);
        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log("message saved");
        });
		
        io.emit('message', {recievedMessage});
    });

    socket.on('timelineReady', function(msg){
        //get all events from database
        var sql = "SELECT * FROM timelineevents";
        connection.query(sql, function (err, result) {
            if (err) throw err;
            socket.emit('timelineEvents', {result});
        });
        

        
    });

});

wait(2000);

var pool = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "root",
	database: "simulationData",
	connectionLimit: 50
});

wait(5000);

pool.getConnection(function (err, conn) {
	if (err) throw err;
	connection = conn;
	console.log("Connected!");
});

runSim(100000);

function runSim(endSimTime) {
	worker.on('message', (msg) => {
		//console.log(msg);

        io.emit('event', {msg});
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