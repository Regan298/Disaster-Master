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
var zip = require('cross-zip')

var worker = new Worker('./autoevents.js'); //autoevents worker
var productionMode = false;
const port = process.env.PORT || 80;

//var zip = require('cross-zip')


module.exports = app;
app.use(express.static('resources'));
app.use('/currentScenario', express.static(__dirname + '/currentScenario'));


//if (process.env.NODE_ENV !== 'test' && !module.parent) {
    http.listen(port, function () {
        console.log('Simulation Run Invoked');
    });
//}

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
    isRunning: false,
    EventTags: ['Cow', 'cat', 'chicken'],
    ngoStatusReports: []
};


var currentRunningInstance;


var currentTimeMs;

//Store connected users
var connectedUsers = [];

var hostIP = ip.address();

if (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'socketTesting' && !module.parent ) {
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

    zipFolder(__dirname + '/generatedScenario', __dirname + '/' + simData.title + 'Scenario.zip', function (err) {
        if (err) {
            console.log('failed to zip', err);
            res.end();
        } else {
            console.log('zipped');
            res.download(__dirname + '/'+simData.title+'Scenario.zip', simData.title+'Scenario.zip');
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

        if (!fs.existsSync(__dirname + '/generatedScenario/')) {
            fs.mkdirSync(__dirname + '/generatedScenario/');
        }
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

app.post('/upload-event-file-live', upload.single('upload'), function (req, res, next) {
    // console.log(req);

    if (req.files != null) {

        let simFileTemp = req.files.upload;

        if (!fs.existsSync(__dirname + '/currentScenario/files/')) {
            fs.mkdirSync(__dirname + '/currentScenario/files/');
        }

        simFileTemp.mv(__dirname + '/currentScenario/files/' + simFileTemp.name, function (err) {
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

app.get('/getReviewFile', function (req, res) {
    GenerateReviewPDF(function () {
        fs.rename(__dirname + '/'+'document.pdf', __dirname + '/' + simData.title + 'Review.pdf', function(err) {
            if ( err ) console.log('ERROR: ' + err);
            res.download(__dirname + '/'+ simData.title + 'Review.pdf', simData.title + 'Review.pdf');
        });
    });

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
        isRunning: false,
        EventTags: ['Cow', 'cat', 'chicken'],
        ngoStatusReports: []
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
            //if (simData.loaded) {
                clearSimData();
            //}
            //Move file into working dir
            let simFileTemp = req.files.simFile;
            simFileTemp.mv(__dirname + '/' + simFileTemp.name.replace(/ /g, "_"), function (err) {
                if (err) {
                    console.log(err);
                    return res.status(400).send(err);
                }


                if (!fs.existsSync(__dirname + directoryForModification)) {
                    fs.mkdirSync(__dirname + directoryForModification);
                }




                zip.unzip(__dirname + '/' + simFileTemp.name.replace(/ /g, "_"),  __dirname + directoryForModification, function (err) {
                    //extract(__dirname + '/' + simFileTemp.name, {dir: __dirname + directoryForModification}, function (err) {
                    if (err) console.log("unziperror: " + err);

                    if (fs.existsSync(__dirname + '/' + simFileTemp.name.replace(/ /g, "_"))) {
                        fs.unlink(__dirname + '/' + simFileTemp.name.replace(/ /g, "_"), (err) => {
                            if (err) throw err;
                            console.log('successfully deleted zip');
                        });
                    }


                    if (fs.existsSync(__dirname + directoryForModification + 'scenario.xml')) {


                        var directory = directoryForModification;
                        console.log(__dirname + directory + 'scenario.xml');

                        try {

                            var ngosArray;
                            var eventsArray;
                            var parser = new xml2js.Parser();

                            fs.readFile(__dirname + directoryForModification + 'scenario.xml', function (err, data) {
                                if (err) {
                                    console.log('here1');
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

                                    if(!(ngosArray === undefined)){
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
                                    }

                                    eventsArray = result['scenario']['event'];

                                    if(!(eventsArray === undefined)){
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
                                                latestUpdateTime: 0,
                                                ChosenNGOTag: "Not Chosen"
                                            };
                                            simData.eventsList.push(event);
                                        }
                                    }

                                    let libraryArray = result['scenario']['library'];
                                    if(!(libraryArray === undefined)){
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
                                    }

                                    simData.durationMs = result['scenario']['duration'];
                                    var hoursInDay = result['scenario']['hoursInDay'];
                                    simData.timeScale = 24 / hoursInDay;
                                    simData.ready = true;
                                    simData.loaded = true;
                                    simData.startTimeMS = new Date().getTime();



                                    if(simData.title.length == 0 || simData.ngoCount == 999 || simData.ngoList.length == 0
                                        || simData.eventsList == 0 || simData.durationMs == null || simData.timeScale.toString() === 'NaN'){
                                            console.log('here2');
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
                                    console.log('here3');
                                    console.log(err);
                                    return res.status(400).send("Bad File, Please Input A Valid File :)");
                                });
                            });
                        } catch (e) {
                            console.log('here4');
                            return res.status(400).send("Bad File, Please Input A Valid File :)");
                        }
                    } else {
                        console.log('here5');
                        return res.status(400).send("Bad File, Please Input A Valid File :)");
                    }
                });
            });

            //create current scenario dir


            //extract input zip into current scenario dir


        } else {
            console.log('here6');
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

            if (!fs.existsSync(__dirname + '/generatedScenario')) {
                fs.mkdirSync(__dirname + '/generatedScenario');
            }

            fs.writeFile("./generatedScenario/scenario.xml", xml, function (err) {
                if (err) {
                    return console.log(err);
                }

                console.log('File generated');
                socket.emit('xmlSaved');
            });
        });

        socket.on('updateEvent', function(event){
            simData.eventsList[event.id] = event;
            worker.postMessage(simData);
        });

        socket.on('addEvent', function(event){
            console.log('addEvent');
            console.log(event);
            simData.eventsList.push(event);
            worker.postMessage(simData);
        });

        socket.on('deleteEvent', function(eventI){
            simData.eventsList.splice(eventI, 1);
            worker.postMessage(simData);
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
                        time: responseTime,
                        chosenNGOTag: msg.response.chosenNGOTag
                    });
                    simData.eventsList[i].ChosenNGOTag = msg.response.chosenNGOTag;
                    console.log(simData.eventsList[i]);
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

        socket.on('ngoStatusReport', function (msg) {
            var currentNGOStatusReport = msg.ngoStatusReport;
            simData.ngoStatusReports.push(currentNGOStatusReport);
        });

//Listen for play/pause
        socket.on('play', function () {
            console.log(simData.started);
            if (!simData.started) {
                var data = simData;
                worker = new Worker('./autoevents.js');
                worker.postMessage(data);
                currentRunningInstance = runSim();
                simData.started = true;
                simData.startTimeMS = new Date().getTime();
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

function GenerateReviewPDF(requestReviewCB) {
    var PdfPrinter = require('pdfmake');
    var fonts = {
        Roboto: {
            normal: 'fonts/Roboto-Regular.ttf'
        }
    };
    var printer = new PdfPrinter(fonts);
    var fs = require('fs');

    var newLine = "----------------------------------------------------------------------------------------------------------------------------------------------------------\n";

    console.log("generatePDFCalled");


    var currentDateOBJ = new Date();
    var currentDateString = currentDateOBJ.getDate()+"/"+currentDateOBJ.getMonth()+"/"+currentDateOBJ.getFullYear();

    var duration = simData.durationMs;
    var seconds = Math.floor((duration / 1000) % 60);
    var minutes = Math.floor((duration / 1000 / 60) % 60);
    var hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    if(hours<10){
        hours = "0"+hours;
    }
    if(minutes<10){
        minutes = "0"+minutes;
    }
    if(seconds<10){
        seconds= "0"+seconds;
    }

    var durationFormatted = hours + ":" + minutes + ":" + seconds;


    //organizing simdata into data that will be diplayed on the review pdf
    let ngoInfoList = [];


    for(let i=0;i< simData.ngoList.length; i++){

        var ngoEventsObject = {
            subjects: [],
            eventTimes: [],
            rawEventTimes: [],
            responseTimes: [],
            eventResponses: [],
            responseTagsList: [],
        };
        var ngoInfo = {
            name: simData.ngoList[i].name,
            ngoEventList: ngoEventsObject,
        };
        ngoInfoList.push(ngoInfo);
    }

    //add every event conversation and meta data into each ngo in the ngoInfoList
    //this will organize the data into what is needed to display event and response conversations
    for(let i=0; i<simData.eventsList.length; i++){
        for(let j=0; j<ngoInfoList.length; j++){
            //if event matches recipient name for ngo then add relevant data to ngoinfo
            if(simData.eventsList[i].recipient.toString()===ngoInfoList[j].name.toString()){

                let eventTime = simData.eventsList[i].time;
                var timeSplit = eventTime.toString().split(":");
                var h = parseInt(timeSplit[0], 10);
                var m = parseInt(timeSplit[1], 10);
                var s = parseInt(timeSplit[2], 10);
                let eventTimeRaw = simData.eventsList[i].time;

                let eventTimeFormated = h+"h"+m+"m"+s+"s";
                let subject = simData.eventsList[i].subject;
                let response = [];
                let responseTimes = [];
                let responseTags = [];
                //adding reponses and response times into arrays
                for(let k = 0; k<simData.eventsList[i].responses.length; k++){
                    response.push(simData.eventsList[i].responses[k].content);
                    let timeCollect = simData.eventsList[i].responses[k].time;
                    let time=(timeCollect-simData.startTimeMS);
                    //console.log(simData.startTimeMS);
                    var seconds = Math.floor((time / 1000) % 60);
                    var minutes = Math.floor((time / 1000 / 60) % 60);
                    var hours = Math.floor((time / (1000 * 60 * 60)) % 24);

                    if(hours<10){
                        hours = "0"+hours;
                    }
                    if(minutes<10){
                        minutes = "0"+minutes;
                    }
                    if(seconds<10){
                        seconds= "0"+seconds;
                    }

                    let convertedTime = hours + ":" + minutes + ":" + seconds;
                    responseTimes.push(convertedTime);
                    responseTags.push(simData.eventsList[i].responses[k].chosenNGOTag);
                }
                //adding data into the same index of each array in the ngoInfo variables
                //if there are no responses then no data will be added into the array for response times and content
                if(response.length===0){
                    let responseTimeEmpty = [];
                    responseTimeEmpty.push("No Data");
                    ngoInfoList[j].ngoEventList.responseTimes.push(responseTimeEmpty);

                    let responseEmpty = [];
                    responseEmpty.push("No Data");
                    ngoInfoList[j].ngoEventList.eventResponses.push(responseEmpty);

                    let responseTagsEmpty = [];
                    responseTagsEmpty.push("No Data");
                    ngoInfoList[j].ngoEventList.responseTagsList.push(responseTagsEmpty);
                }
                else {
                    ngoInfoList[j].ngoEventList.responseTimes.push(responseTimes);
                    ngoInfoList[j].ngoEventList.eventResponses.push(response);
                    ngoInfoList[j].ngoEventList.responseTagsList.push(responseTags);
                }
                ngoInfoList[j].ngoEventList.subjects.push(subject);
                ngoInfoList[j].ngoEventList.eventTimes.push(eventTimeFormated);
                ngoInfoList[j].ngoEventList.rawEventTimes.push(eventTimeRaw);
            }
        }

    }

    //collect Repsonse times for Ngos and calculate average response times
    //need to find out event response times and the event time for every ngo then calculate the difference and find
    // the average inital response time. Only using the first response time from a ngo response to an event
    let averageResponseTimes = [];
    for(let i=0;i<ngoInfoList.length;i++){
        let ngoResponseDelay = [];
        for(let j=0;j<ngoInfoList[i].ngoEventList.eventTimes.length;j++){
            //get values for response time and event times, then alter and calculate difference
             let eventTime = ngoInfoList[i].ngoEventList.rawEventTimes[j];
             let responseTime = ngoInfoList[i].ngoEventList.responseTimes[j][0];
            if(responseTime.toString()!=="No Data") {
                let tempEventSeconds = eventTime.toString().split(':'); // split it at the colons
                let tempResponseSeconds = responseTime.split(":");
                // minutes are worth 60 seconds. Hours are worth 60 minutes.
                let eventSeconds = (+tempEventSeconds[0]) * 60 * 60 + (+tempEventSeconds[1]) * 60 + (+tempEventSeconds[2]);
                let responseSeconds = (+tempResponseSeconds[0]) * 60 * 60 + (+tempResponseSeconds[1]) * 60 + (+tempResponseSeconds[2]);
                let delay = responseSeconds-eventSeconds;
                ngoResponseDelay.push(delay);
            }
        }
        //find average for single ngo and add to average response time\
        let averageDelay = 0;
        for(let j=0;j<ngoResponseDelay.length;j++){
            averageDelay += ngoResponseDelay[j];
        }
        averageDelay = (averageDelay/ngoResponseDelay.length);
        averageResponseTimes.push(averageDelay);
    }

    var NGOEventString = "\n";
    for(var i=0; i < ngoInfoList.length; i++ ){
        NGOEventString += "NGO: " + ngoInfoList[i].name + "\n";
        NGOEventString += "Average Response Time: " + averageResponseTimes[i].toFixed(1)+" Seconds"+"\n\n";


        for(var j=0; j < ngoInfoList[i].ngoEventList.subjects.length; j++ ){
            NGOEventString += "Event: " + ngoInfoList[i].ngoEventList.subjects[j] + "\n";
            NGOEventString += "Time: " + ngoInfoList[i].ngoEventList.eventTimes[j] + "\n\n";

            for(var k=0; k < ngoInfoList[i].ngoEventList.eventResponses[j].length; k++ ){
                var temp1 = ngoInfoList[i].ngoEventList.eventResponses[j];

                if(temp1.toString() ==="No Data"){
                    NGOEventString += "No Response Data for this Event. \n\n";
                    break;
                }

                NGOEventString += "Response: " + ngoInfoList[i].ngoEventList.eventResponses[j][k] + ". \n";
                NGOEventString += "Time of Response: " + ngoInfoList[i].ngoEventList.responseTimes[j][k] + ". \n";
                NGOEventString += "Tag: " + ngoInfoList[i].ngoEventList.responseTagsList[j][k] + ". \n\n";

            }
            NGOEventString += "\n\n";
            NGOEventString += newLine;
        }


    }

    var ngoStatusReportString = "";

    for(var currentNGO of simData.ngoList){
        ngoStatusReportString += "NGO: " + currentNGO.name + "\n";
        for(var i = 0; i < simData.ngoStatusReports.length; i++){

            if(simData.ngoStatusReports[i].name.toString() === currentNGO.name.toString()){
                ngoStatusReportString += "Hour " + simData.ngoStatusReports[i].hour + ": " + simData.ngoStatusReports[i].status + "\n";
            }
        }

        ngoStatusReportString += newLine;
    }

    console.log(ngoStatusReportString);


    //Output Accumalative String Into PDF
    var docDefinition = {
        content: [
            {
                text: "Scenario: " + simData.title,
                style: 'header'
            },
            {
                text: "Date: " + currentDateString,
                style: 'header'
            },
            {
                text: "Duration: " + durationFormatted,
                style: 'header'
            },
            {
                text : NGOEventString
            },
            {
                text : "Status Reports On The Hour",
                style: 'header'
            },
            {
                text : ngoStatusReportString
            },

        ],
        styles: {
            header: {
                fontSize: 25
                //bold: true
            },
            subheader: {
                fontSize: 15
                //bold: true
            },
            quote: {
                //italics: true
            },
            small: {
                fontSize: 8
            }
        }
    };

    var options = {
        // ...
    };

    var pdfDoc = printer.createPdfKitDocument(docDefinition, options);

    var writeStream = fs.createWriteStream('document.pdf');
    pdfDoc.pipe(writeStream);

    writeStream.on('close', function() {
        requestReviewCB();
    });

    pdfDoc.end();

}
