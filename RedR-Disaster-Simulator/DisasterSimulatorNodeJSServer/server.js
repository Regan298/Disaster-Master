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
    title: "",
    ngoCount: 999,
    ngoList: []

};


var ngoUsers = [];


const worker = new Worker('./autoevents.js');

app.use(express.static('resources'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/hq-config', function (req, res) {
    res.sendFile(__dirname + '/hq-config.html');
});

app.get('/hq-run-simulation', function (req, res) {
    res.sendFile(__dirname + '/hq-run-simulation.html');
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

    if (req.files != null) {
        console.log("filereq");

        let simFileTemp = req.files.simFile;

        simFileTemp.mv(__dirname + '/currentScenario.xml', function (err) {
            if(err) {
                return res.status(500).send(err);
            }

        });


        let validFile = parseXMLForLoading();

        if(!validFile){
            return res.status(500).send("Bad File, Please Input A Valid File :)");
        } else {
            res.redirect('hq-run-simulation');
            res.end("File Sent");



        }
        simData.ready = true;



    } else {
        return res.status(500).send("Bad File, Please Input A Valid File :)");
    }

});

function parseXMLForLoading() {

    try {
        var name;
        var ngoCount;
        var ngosArray;
        var eventsArray;


        var parser = new xml2js.Parser();
        fs.readFile(__dirname + '/currentScenario.xml', function (err, data) {
            parser.parseString(data, function (err, result) {
                simData.title = result['scenario']['name'].toString();
                simData.ngoCount = result['scenario']['ngoCount'].toString();
                ngosArray = result['scenario']['ngo'];
                for (var i = 0; i < ngosArray.length; i++) {
                    var currentNGOName = ngosArray[i].name;
                    var currentNGOPasskey = ngosArray[i].passkey;
                    var ngo = {
                        name: currentNGOName,
                        passkey: currentNGOPasskey
                    }
                    simData.ngoList.push(ngo);
                }

                //debug the ngo ids
                for (var i = 0; i < simData.ngoList.length; i++) {
                    console.log(simData.ngoList[i].id);
                }


                eventsArray = result['scenario']['event'];


                for (var i = 0; i < eventsArray.length; i++) {
                    var currentEventRecipient = eventsArray[i].recipient;
                    var currentEventTime = eventsArray[i].time;
                    var currentEventType = eventsArray[i].type;
                    var currentEventLocation = eventsArray[i].location;

                    var sql = "INSERT INTO timelineevents (Recipient, Time, Type, Location)" +
                        " VALUES (" + "'" + currentEventRecipient + "', '" + currentEventTime + "', '" + currentEventType + "', '"
                        + currentEventLocation + "') ";
                    pool.query(sql, function (err, result) {
                        if (err) throw err;
                        console.log("timeline event loaded from file");
                    });
                }


            });
        });

    } catch (e) {
        return false;
    }

    return true;





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

            //if (!found) {
            var ngoName;

                for (var i = 0; i < simData.ngoList.length; i++) {

                    if(simData.ngoList[i].passkey == msg){
                        ngoName = simData.ngoList[i].name;
                    }

                }


                var ngo = {
                    ip: ipCurrent,
                    id: msg,
                    name: ngoName
                }

                console.log(ngo.ip);
                console.log(ngo.name);
                ngoUsers.push(ngo);

                io.emit('ngoList', {ngoUsers});
            //}


        }

    });

    //socket.emit('ngoName', ngoTemp.name);

    //Send NGO Name To Relevant NGO
    for(var i = 0; i < ngoUsers.length; i++){
        ngoTemp = ngoUsers[i];
        if(ngoTemp.ip == ipCurrent){
            if(!ngoTemp.name.includes("HQ")) {
                console.log(ngoTemp.name);
                socket.emit('ngoName', ngoTemp.name);
            }
        }
    }

    //Send each NGO name to HQ

    //Make an array that contains every ngo name
    var ngoNames = [];
    for(var i=0; i < simData.ngoList.length; i++){
        ngoNames.push(simData.ngoList[i].name);
    }
    console.log("ngoNames: " + ngoNames.length);
    io.emit('currentNGONames', {ngoNames});


    //dk wat this does rn:
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
    multipleStatements: true,
	connectionLimit: 50
});

wait(3000);

pool.getConnection(function (err, conn) {
	if (err) throw err;
	connection = conn;
	console.log("Connected!");
    runSim(1000000);
});



function runSim(endSimTime) {
    //clear DB
    connection.query("TRUNCATE TABLE timelineevents; TRUNCATE TABLE messages; TRUNCATE TABLE ngos", function (err, result){
        if(err) throw err;
        console.log("DB cleared");
    });
	worker.on('message', (msg) => {
		//console.log("got events");

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
