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
var xml2js = require('xml2js');
var parser = new xml2js.Parser();
app.use(fileUpload());
var simFile;
var connection;
var formidable = require('formidable');

//ngoCount gets updated when file parsed
const simData = {
    ready: false,
    title: "Sebadoah",
    ngoCount: 99
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
        console.log("file stuff");


        let simFileTemp = req.files.simFile;

        simFileTemp.mv(__dirname + '/currentScenario.xml', function (err) {
            if(err)
                return res.status(500).send(err);

        });
        simData.ready = true;
        parseXMLForLoading();

    }

});

function parseXMLForLoading() {
    var name;
    var ngoCount;
    var eventsArray;



    var parser = new xml2js.Parser();
    fs.readFile(__dirname + '/currentScenario.xml', function(err, data) {
        parser.parseString(data, function (err, result) {
            simData.title = result['scenario']['name'].toString();
            simData.ngoCount = result['scenario']['ngoCount'].toString();
            eventsArray = result['scenario']['event'];



            for(var i = 0; i < eventsArray.length; i++){
                var currentEventRecipient = eventsArray[i].recipient;
                var currentEventTime = eventsArray[i].time;
                var currentEventType = eventsArray[i].type;
                var currentEventLocation = eventsArray[i].location;

                var sql = "INSERT INTO timelineevents (Recipient, Time, Type, Location)" +
                    " VALUES (" + "'" + currentEventRecipient  + "', '" + currentEventTime + "', '" + currentEventType + "', '"
                    + currentEventLocation + "') ";
                pool.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log("timeline event loaded from file");
                });
            }


        });
    });





}



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