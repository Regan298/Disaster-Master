const fs = require('fs');
var ip = require('ip');
var opn = require('opn');
var express = require('express');
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const {Worker, isMainThread, parentPort} = require('worker_threads');
const fileUpload = require('express-fileupload');
var multer  = require('multer');
var upload = multer({ dest: 'library/' });
var TimeFormat = require('hh-mm-ss');
var dateFormat = require('dateformat');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();
app.use(fileUpload());
var formidable = require('formidable');
var worker; //auto events worker
const port = process.env.PORT || 80;


module.exports = app;
app.use(express.static('resources'));

http.listen(port, function () {
    console.log('Simulation Run Invoked');
});

//ngoCount gets updated when file parsed
var simData = {
    ready: false,
    title: "",
    ngoCount: 999,
    ngoList: [],
    eventsList: [],
    messageList: [],
    durationMs: 0,
    timeScale: 0,
    started: false,
    modeOnline: true,
    occurredEvents: []
};


var currentTimeMs;

//Store connected users
var connectedUsers = [];

var hostIP = ip.address();
opn('http://' + hostIP);

var host = {
    passkey: 'HQ',
    name: 'HQ'
};

//Stoe HQ as User
connectedUsers.push(host);

//Begin Route Handling
app.get('/testing', function (req, res) {
    res.sendStatus(200);
});


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});


app.get('/hq-config', function (req, res) {
    res.sendFile(__dirname + '/hq-config.html');
});

app.get('/hq-review', function (req, res) {
    res.sendFile(__dirname + '/hq-review-simulation.html');
});

app.get('/hq-run-simulation', function (req, res) {
    res.sendFile(__dirname + '/hq-run-simulation.html');
});

app.get('/hq-create', function (req, res) {
    res.sendFile(__dirname + '/scenario-edit-home.html');
});

app.get('/scenario-create', function (req, res) {
    res.sendFile(__dirname + '/scenario-edit.html');
});

app.get('/scenario-edit', function (req, res) {
    res.sendFile(__dirname + '/scenario-upload.html');
});

app.get('/ngo', function (req, res) {

    res.sendFile(__dirname + '/ngo-config.html');
});

app.get('/ngo-simulation', function (req, res) {
    console.log(req.query);
    res.sendFile(__dirname + '/ngo-simulation.html');
});

app.get('/about', function (req, res) {
    res.sendFile(__dirname + '/about.html');
});

app.get('/help', function (req, res) {
    res.sendFile(__dirname + '/help.html');
});

app.post('/editor-upload', function (req, res) {
    console.log("upload req");
    if (req.files != null) {
        simData.eventsList = [];

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
            res.redirect('scenario-create');
            res.end("File Sent");
        }
        



    } else {
        console.log("no file");
        return res.status(400).send("Bad File, Please Input A Valid File :)");
}

});

app.post('/upload-event-file', upload.single('upload'), function (req, res, next) {
    console.log(req);
    if (req.files != null) {

        let simFileTemp = req.files.upload;
        console.log(simFileTemp);

        simFileTemp.mv(__dirname + '/resources/files/'+simFileTemp.name, function (err) {
            if(err) {
                return res.status(400).send(err);
            }
        });
        res.end();
    } else {
        console.log("no file");
        return res.status(400).send("Bad File, Please Input A Valid File :)");
    }
})

//Process Sceanrio File For Uploading
app.post('/upload', function (req, res) {

    if (req.files != null) {
        clearSimData();

        let simFileTemp = req.files.simFile;
        simFileTemp.mv(__dirname + '/currentScenario.xml', function (err) {
            if (err) {
                return res.status(400).send(err);
            }

        });
        let validFile = parseXMLForLoading();
        if (!validFile) {
            return res.status(400).send("Bad File, Please Input A Valid File :)");
        } else {
            res.redirect('hq-run-simulation');
            res.end("File Sent");
        }
    } else {

        return res.status(400).send("Bad File, Please Input A Valid File :)");
    }
});

//End Route Handling

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
                if (result['scenario']['mode'].toString() === "online") {
                    simData.modeOnline = true;
                } else {
                    simData.modeOnline = false;
                }

                console.log(simData.modeOnline);
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

                simData.timeScale = 24 / hoursInDay;
            });
            simData.ready = true;
        });
    } catch (e) {
        return false;
    }

    return true;

}

// On connection for when an entity is using socket
io.on('connection', function (socket) {
    console.log("new connection");


    //When ngo is attempting to join
    socket.on('join', function (msg) {

        //Accept only if ngo not in sim yet
        var ngoName;

        for (var i = 0; i < simData.ngoList.length; i++) {
            if (simData.ngoList[i].passkey == msg) {
                ngoName = simData.ngoList[i].name;
            }
        }

        var isNGOPresent = false;
        for (var i = 0; i < connectedUsers.length; i++) {
            if(connectedUsers[i].name === ngoName) {
                isNGOPresent = true;
                break;
            }
        }

        if(!isNGOPresent){

        var ngo = {
            id: msg,
            name: ngoName
        }
        //Add new ngo to connected users
        connectedUsers.push(ngo);
        socket.emit('loginState', 'accepted');
    }


});

//Send past messages to NGOs upon request
socket.on('getPastMessages', function (msg, callback) {
    var pastMessages = simData.messageList;
    callback({pastMessages});
});

//Send connectedusers to ngo upon ngo request
socket.on('getConnected', function (msg, callback) {
    callback({connectedUsers});
});


//Send NGO Name To Relevant NGO
socket.on('nameRequest', function (msg, callback) {
    for (var i = 0; i < connectedUsers.length; i++) {
        ngoTemp = connectedUsers[i];
        if (ngoTemp.id == msg) {
            if (!ngoTemp.name.includes("HQ")) {
                callback(ngoTemp.name);
            }
        }
    }
});


// Trigger for Run simulation displaying of sceanrio title and timeline view update
if (simData.ready) {

    socket.on('simState', function (msg, callback) {
        console.log('event received: ' + msg);
        callback({simData});
    });
    //io.emit('simState', {simData});

}

//Messaging Handling
socket.on('message', function (msg) {
    var recievedMessage = {
        from: msg.message.from,
        to: msg.message.to,
        content: msg.message.content
    }

    //store in simdata
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

//Listen for play/pause
socket.on('play', function () {
    if (!simData.started) {
        var data = simData;
        worker = new Worker('./autoevents.js', {workerData: data});
        runSim();
        simData.started = true;
    } else {
        worker.postMessage('play');
    }
});
socket.on('pause', function () {
    worker.postMessage('pause');
});

})
;

function runSim() {
    worker.on('message', (msg) => {
        currentTimeMs = simData.durationMs - msg.timeMs;
        var time = msg.timeMs;
        var occurredEvents = msg.events;
        io.emit('currentTime', currentTimeMs);
        io.emit('occurredEvents', {occurredEvents, time});
    });
}