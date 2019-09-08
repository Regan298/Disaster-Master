const fs = require('fs');
var ip = require('ip');
var opn = require('opn');
var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const {Worker, isMainThread, parentPort} = require('worker_threads');
const fileUpload = require('express-fileupload');
var multer = require('multer');
var upload = multer({dest: 'library/'});
var TimeFormat = require('hh-mm-ss');
var dateFormat = require('dateformat');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();
app.use(fileUpload());
var formidable = require('formidable');
var xmlBuilder = require('xmlbuilder');
var path = require('path');
var zipFolder = require('zip-folder');
var extract = require('extract-zip');
var rimraf = require("rimraf");

var worker; //auto events worker
var productionMode = false;
const port = process.env.PORT || 80;

var zip = require('cross-zip')


module.exports = app;
app.use(express.static('resources'));

if (process.env.NODE_ENV !== 'test') {
    http.listen(port, function () {
        console.log('Simulation Run Invoked');
    });
}

//ngoCount gets updated when file parsed
var simData = {
    loaded: false,
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
    occurredEvents: [],
    library: [],
    startTimeMS: 0,
    isRunning: false
};

var currentRunningInstance;


var currentTimeMs;

//Store connected users
var connectedUsers = [];

var hostIP = ip.address();

if (process.env.NODE_ENV !== 'test') {
    opn('http://' + hostIP);
}

var host = {
    passkey: 'HQ',
    name: 'HQ'
};

//Stoe HQ as User
connectedUsers.push(host);

//Begin Route Handling


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});


app.get('/hq-config', function (req, res) {
    res.sendFile(__dirname + '/hq-config.html');
});

/*app.get('/hq-review', function (req, res) {
    res.sendFile(__dirname + '/hq-review-simulation.html');
});*/

app.get('/hq-run-simulation', function (req, res) {
    res.sendFile(__dirname + '/hq-run-simulation.html');
});

app.get('/hq-create', function (req, res) {
    res.sendFile(__dirname + '/scenario-edit-home.html');
});

app.get('/scenario-create-new', function (req, res) {
    clearSimData();
    clearGeneratedScenario();
    res.sendFile(__dirname + '/scenario-edit.html');
});

app.get('/scenario-create', function (req, res) {
    res.sendFile(__dirname + '/scenario-edit.html');
});

app.get('/scenario-edit', function (req, res) {
    clearSimData();
    clearGeneratedScenario();
    res.sendFile(__dirname + '/scenario-upload.html');
});

app.get('/ngo', function (req, res) {

    res.sendFile(__dirname + '/ngo-config.html');
});

app.get('/ngo-simulation', function (req, res) {
    res.sendFile(__dirname + '/ngo-simulation.html');
});

app.get('/about', function (req, res) {
    res.sendFile(__dirname + '/about.html');
});

app.get('/help', function (req, res) {
    res.sendFile(__dirname + '/help.html');
});

app.get('/download-save', function (req, res) {
    // console.log(req);

    zipFolder(__dirname + '/generatedScenario', __dirname + '/scenario.zip', function (err) {
        if (err) {
            console.log('failed to zip', err);
            res.end();
        } else {
            console.log('zipped');
            res.download(__dirname + '/scenario.zip', 'scenario.zip');
        }
    });

});


app.post('/editor-upload', function (req, res) {
    processZip(req, res, 'edit');
});

app.post('/upload-event-file', upload.single('upload'), function (req, res, next) {
    // console.log(req);

    if (req.files != null) {

        let simFileTemp = req.files.upload;

        if (!fs.existsSync(__dirname + '/generatedScenario/files/')) {
            fs.mkdirSync(__dirname + '/generatedScenario/files/');
        }

        simFileTemp.mv(__dirname + '/generatedScenario/files/' + simFileTemp.name, function (err) {
            if (err) {
                console.log(err);
                res.status(400).send(err);
                res.end();
            } else {
                res.end();
            }
        });
    } else {
        console.log("no file");
        return res.status(400).send("Bad File, Please Input A Valid File :)");
    }
});

app.post('/upload-library-file', upload.single('upload'), function (req, res, next) {
    // console.log(req);

    if (req.files != null) {

        let simFileTemp = req.files.upload;

        if (!fs.existsSync(__dirname + '/generatedScenario/files/library')) {
            fs.mkdirSync(__dirname + '/generatedScenario/files/library');
        }

        simFileTemp.mv(__dirname + '/generatedScenario/files/library/' + simFileTemp.name, function (err) {
            if (err) {
                console.log(err);
                res.status(400).send(err);
                res.end();
            } else {
                res.end();
            }
        });
    } else {
        console.log("no file");
        return res.status(400).send("Bad File, Please Input A Valid File :)");
    }
});

function clearGeneratedScenario() {
    rimraf(__dirname + "/generatedScenario", function () {
        console.log("deleted generated scenario");
    });
}


function clearSimData() {
    simData = {
        loaded: false,
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
        occurredEvents: [],
        library: [],
        startTimeMS: 0,
        isRunning: false
    };
    connectedUsers = [];
    connectedUsers.push(host);
    if (worker != null) {
        worker.terminate();
    }
}

function processZip(req, res, type) {
    let directoryForModification;
    if(type === 'edit'){
        directoryForModification = '/generatedScenario/';
    } else {
        directoryForModification = '/currentScenario/';
    }

    rimraf(__dirname + directoryForModification, function () {
        console.log("deleted current scenario");

        if (req.files != null) {
            //todo: Enable Production Mode When Finished
            if (productionMode && simData.loaded) {
                return res.status(400).send("Simulation Currently Already Running Please End Your Current Simulation and" +
                    " Go Back And Try Again");
            }
            if (simData.loaded) {
                clearSimData();
            }
            //Move file into working dir
            let simFileTemp = req.files.simFile;
            simFileTemp.mv(__dirname + '/' + simFileTemp.name, function (err) {
                if (err) {
                    console.log(err);
                    return res.status(400).send(err);
                }
            });

            //create current scenario dir
            if (!fs.existsSync(__dirname + directoryForModification)) {
                fs.mkdirSync(__dirname + directoryForModification);
            }

            //extract input zip into current scenario dir

            zip.unzip(__dirname + '/' + simFileTemp.name,  __dirname + directoryForModification, function (err) {
            //extract(__dirname + '/' + simFileTemp.name, {dir: __dirname + directoryForModification}, function (err) {
                if (err) console.log("unziperror: " + err);

                if (fs.existsSync(__dirname + '/' + simFileTemp.name)) {
                    fs.unlink(__dirname + '/' + simFileTemp.name, (err) => {
                        if (err) throw err;
                        console.log('successfully deleted zip');
                    });
                }


                if (fs.existsSync(__dirname + directoryForModification+'scenario.xml')) {


                    var directory = directoryForModification;
                    console.log(__dirname + directory + 'scenario.xml');

                    try {

                        var ngosArray;
                        var eventsArray;
                        var parser = new xml2js.Parser();

                        fs.readFile(__dirname + directoryForModification + 'scenario.xml', function (err, data) {
                            if (err) {
                                return res.status(400).send("Bad File, Please Input A Valid File :)");
                            }
                            parser.parseStringPromise(data).then(function (result) {
                                simData.title = result['scenario']['name'].toString();
                                simData.ngoCount = result['scenario']['ngoCount'].toString();
                                if (result['scenario']['mode'].toString() === "online") {
                                    simData.modeOnline = true;
                                } else {
                                    simData.modeOnline = false;
                                }
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
                                eventsArray = result['scenario']['event'];

                                for (var i = 0; i < eventsArray.length; i++) {
                                    var currentEventRecipient = eventsArray[i].recipient;
                                    var currentEventTime = eventsArray[i].time;
                                    var currentEventType = eventsArray[i].type[0];
                                    var currentEventLocation = eventsArray[i].location;
                                    var currentEventSubject = eventsArray[i].subject;

                                    var event = {
                                        id: i,
                                        recipient: currentEventRecipient,
                                        time: currentEventTime,
                                        type: currentEventType,
                                        location: currentEventLocation,
                                        subject: currentEventSubject,
                                        responses: [],
                                        latestUpdateTime: 0
                                    };
                                    simData.eventsList.push(event);
                                }
                                let libraryArray = result['scenario']['library'];
                                for (var i = 0; i < libraryArray.length; i++) {
                                    var currentLibraryType = libraryArray[i].type[0];
                                    var currentLibraryLocation = libraryArray[i].location;
                                    var currentLibrarySubject = libraryArray[i].subject;

                                    var libraryItem = {
                                        id: i,
                                        type: currentLibraryType,
                                        location: currentLibraryLocation,
                                        subject: currentLibrarySubject
                                    };
                                    simData.library.push(libraryItem);
                                }
                                simData.durationMs = result['scenario']['duration'];
                                var hoursInDay = result['scenario']['hoursInDay'];
                                simData.timeScale = 24 / hoursInDay;
                                simData.ready = true;
                                simData.loaded = true;
                                simData.startTimeMS = new Date().getTime();



                                if(simData.title.length == 0 || simData.ngoCount == 999 || simData.ngoList.length == 0
                                    || simData.eventsList == 0 || simData.durationMs == null || simData.timeScale.toString() === 'NaN'){
                                    return res.status(400).send("Bad File, Please Input A Valid File :)");
                                } else {
                                    console.log(simData.timeScale);
                                    if(type === 'run') {
                                        res.redirect('hq-run-simulation');
                                    } else {
                                        res.redirect('scenario-create');
                                    }
                                    return res.end("File Sent");
                                }

                            }).catch(function (err) {
                                return res.status(400).send("Bad File, Please Input A Valid File :)");
                            });
                        });
                    } catch (e) {
                        return res.status(400).send("Bad File, Please Input A Valid File :)");
                    }
                } else {
                    return res.status(400).send("Bad File, Please Input A Valid File :)");
                }
            });
        } else {
            return res.status(400).send("Bad File, Please Input A Valid File :)");
        }
    });

}

//Process Sceanrio File For Uploading
app.post('/upload', function (req, res) {
    processZip(req, res, 'run');
});

//End Route Handling

// On connection for when an entity is using socket
io.on('connection', function (socket) {
    console.log("new connection");


    //When ngo is attempting to join
    socket.on('join', function (msg) {

        //Accept only if ngo not in sim yet
        var ngoName = 'notFound';

        for (var i = 0; i < simData.ngoList.length; i++) {
            if (simData.ngoList[i].passkey == msg) {
                ngoName = simData.ngoList[i].name;
            }
        }

        var isNGOPresent = false;
        for (var i = 0; i < connectedUsers.length; i++) {
            if (connectedUsers[i].name === ngoName) {
                isNGOPresent = true;
                break;
            }
        }

        if (!isNGOPresent && ngoName !== 'notFound') {
            let ngo = {
                id: msg,
                name: ngoName
            };
            //Add new ngo to connected users
            connectedUsers.push(ngo);
            socket.emit('loginState', 'accepted');
        } else {
            socket.emit('loginState', 'rejected');
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

//Save XML from scenario editor
    socket.on('exportXML', function (data) {

        simData = data;

        var root = xmlBuilder.create('scenario');

        root.ele('name', data.title).end({pretty: true});
        root.ele('ngoCount', data.ngoList.length).end({pretty: true});
        root.ele('duration', '' + data.durationMs).end({pretty: true});
        root.ele('hoursInDay', '' + 24 / data.timeScale).end({pretty: true});
        root.ele('mode', data.modeOnline).end({pretty: true});

        for (var i = 0; i < data.ngoList.length; i++) {
            var item = root.ele('ngo');
            item.ele('name', '' + data.ngoList[i].name).end({pretty: true});
            item.ele('passkey', '' + data.ngoList[i].passkey).end({pretty: true});
            item.end({pretty: true});
        }

        for (var i = 0; i < data.eventsList.length; i++) {
            var item = root.ele('event');
            item.ele('recipient', '' + data.eventsList[i].recipient).end({pretty: true});
            item.ele('subject', '' + data.eventsList[i].subject).end({pretty: true});
            item.ele('time', '' + data.eventsList[i].time).end({pretty: true});
            item.ele('type', '' + data.eventsList[i].type).end({pretty: true});
            item.ele('location', '' + data.eventsList[i].location).end({pretty: true});
            item.end({pretty: true});
        }

        for (var i = 0; i < data.library.length; i++) {
            var item = root.ele('library');
            item.ele('subject', '' + data.library[i].subject).end({pretty: true});
            item.ele('type', '' + data.library[i].type).end({pretty: true});
            item.ele('location', '' + data.library[i].location).end({pretty: true});
            item.end({pretty: true});
        }

        var xml = root.end({pretty: true});

        fs.writeFile("./generatedScenario/scenario.xml", xml, function (err) {
            if (err) {
                return console.log(err);
            }

            console.log('File generated');
            socket.emit('xmlSaved');
        });
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
// if (simData.ready) {

    socket.on('simState', function (msg, callback) {
        callback({simData});
    });
    //io.emit('simState', {simData});

// }

//Messaging Handling
    socket.on('message', function (msg) {
        var recievedMessage = {
            from: msg.message.from,
            to: msg.message.to,
            content: msg.message.content
        };

        console.log(recievedMessage);


        //store in simdata
        var d = new Date();
        var date = dateFormat(d, "HH:MM:ss")
        var message = {
            recipient: msg.message.to,
            sender: msg.message.from,
            time: date,
            content: msg.message.content
        };
        simData.messageList.push(message);
        io.emit('message', {recievedMessage});
    });

    socket.on('newEventResponse', function (msg) {
        //Get event id

        var event = msg.response.event.toString();
        var eventID = parseInt(event, 10);
        //Find event in list of events
        var responseTime = new Date().getTime();
        for (var i = 0; i < simData.eventsList.length; i++) {
            if (simData.eventsList[i].id === eventID) {
                simData.eventsList[i].responses.push({
                    content: msg.response.content,
                    sender: msg.response.from,
                    time: responseTime
                });
                worker.postMessage(simData);
            }
        }
    });

    socket.on('pastEventResponses', function (msg, callback) {

        var event = msg.selectedEvent.toString();
        var eventID = parseInt(event, 10);
        //do lookup of events response data
        var pastEventResponseList;
        for (var i = 0; i < simData.eventsList.length; i++) {
            if (simData.eventsList[i].id === eventID) {
                pastEventResponseList = simData.eventsList[i].responses;
            }
        }

        callback({pastEventResponseList});

    });


//Listen for play/pause
    socket.on('play', function () {
        if (!simData.started) {
            var data = simData;
            worker = new Worker('./autoevents.js', {workerData: data});
            currentRunningInstance = runSim();
            simData.started = true;
        } else {
            worker.postMessage('play');
        }
        simData.isRunning = true;
    });

    socket.on('pause', function () {
        worker.postMessage('pause');
        simData.isRunning = false;
    });

});

function runSim() {
    worker.on('message', (msg) => {

        currentTimeMs = simData.durationMs - msg.timeMs;
        var time = msg.timeMs;
        var occurredEvents = msg.events;
        io.emit('currentTime', currentTimeMs);
        io.emit('occurredEvents', {occurredEvents, time});
    });

}