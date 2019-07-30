const fs = require('fs');
var ip = require('ip');
var opn = require('opn');
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
var formidable = require('formidable');

var currentTimeMs;
var occurredEvents = [];

//ngoCount gets updated when file parsed
const simData = {
    ready: false,
    title: "",
    ngoCount: 999,
    ngoList: [],
    eventsList: [],
    messageList: [],
    durationMs: 0,
    timeScale: 0,
    started: false
};


var ngoUsers = [];


var worker;

app.use(express.static('resources'));

app.get('/testing', function(req, res) {
    res.sendStatus(200);
});

module.exports = app;

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
    res.sendFile(__dirname + '/ngo-config.html');
});

app.get('/ngo-simulation', function (req, res) {
    console.log('request: ' + req.url);
    res.sendFile(__dirname + '/ngo-simulation.html');
});

app.get('/about', function (req, res) {
    res.sendFile(__dirname + '/about.html');
});

app.get('/help', function (req, res) {
    res.sendFile(__dirname + '/help.html');
});

app.post('/upload', function (req, res) {
    console.log("upload req");
    if (req.files != null) {


        let simFileTemp = req.files.simFile;

        simFileTemp.mv(__dirname + '/currentScenario.xml', function (err) {
            if(err) {
                return res.status(400).send(err);
            }

        });


        let validFile = parseXMLForLoading();

        if(!validFile){
            return res.status(400).send("Bad File, Please Input A Valid File :)");
        } else {
            res.redirect('hq-run-simulation');
            res.end("File Sent");
        }
        



    } else {
        console.log("no file");
        return res.status(400).send("Bad File, Please Input A Valid File :)");
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
                        id: i,
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
                    var currentEventSubject = eventsArray[i].subject;

                    var event = {
                        id: i,
                        recipient: currentEventRecipient,
                        time: currentEventTime,
                        type: currentEventType,
                        location: currentEventLocation,
                        subject: currentEventSubject
                    }

                    simData.eventsList.push(event);
                }

                simData.durationMs = result['scenario']['duration'];
                var hoursInDay = result['scenario']['hoursInDay'];

                simData.timeScale = 24/hoursInDay;
            });
            simData.ready = true;
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
                socket.emit('loginState', 'accepted');
                io.emit('ngoList', {ngoUsers});
            //}


        }

    });

    //socket.emit('ngoName', ngoTemp.name);

    //Send NGO Name To Relevant NGO

        for (var i = 0; i < ngoUsers.length; i++) {
            ngoTemp = ngoUsers[i];
            if (ngoTemp.ip == ipCurrent) {
                if (!ngoTemp.name.includes("HQ")) {
                    console.log(ngoTemp.name);
                    socket.emit('nameRequest', ngoTemp.name);
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
        var message = {
            recipient: msg.message.to,
            sender: msg.message.from,
            time: date,
            content: msg.message.content
        }
        simData.messageList.push(message);
		
        io.emit('message', {recievedMessage});
    });

    socket.on('timelineReady', function(msg){
        //send all events & ngos to timeline
        console.log("timeline ready");
        var ngos = simData.ngoList;
        socket.emit('ngos', {ngos});

        socket.emit('timeScale', simData.timeScale);

        socket.emit('duration', simData.durationMs);

        var events = simData.eventsList;
        socket.emit('timelineEvents', {events});
        
    });
    
    //Listen for play/pause
    socket.on('play', function(){
        if(!simData.started){
            var data = simData;
            worker = new Worker('./autoevents.js', {workerData: data});
            runSim();
            simData.started = true;
        }else{
            console.log('play');
            worker.postMessage('play');
        }
    });
    socket.on('pause', function(){
        console.log('pause');
        worker.postMessage('pause');
    });

});

function runSim() {
	worker.on('message', (msg) => {
		// console.log(msg);
        currentTimeMs = simData.durationMs-msg.timeMs;
        var time = msg.timeMs;
        occurredEvents = msg.events;
        io.emit('currentTime', currentTimeMs);
        io.emit('occurredEvents', {occurredEvents, time});
	});
    console.log("init server");
    
    //worker.postMessage('init', workerData);
}

function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
}


function shutdown() {
    process.exit();
}