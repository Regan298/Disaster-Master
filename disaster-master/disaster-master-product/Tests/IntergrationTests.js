var should = require('should');
var io = require('socket.io-client');
var supertest = require('supertest');
var request = supertest('localhost:80');
var app = require('../server.js')

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
//chai.should();
const {expect} = chai;

var socketURL = 'http://localhost:80';

var options = {
    transports: ['websocket'],
    'force new connection': true
};

describe("Routing And File Tests", function () {
    it('home request should return status 200 and content type html', function (done) {
        chai.request(app).get('/')
            .end(function (err, res) {
                expect(res.type).to.equal('text/html');
                expect(res.status).to.equal(200);
                done();
            });

    });

    it('simulation config should return status 200 and content type html', function (done) {
        chai.request(app).get('/hq-config')
            .end(function (err, res) {
                expect(res.type).to.equal('text/html');
                expect(res.status).to.equal(200);
                done();
            });

    });

    it('run simulation should return status 200 and content type html', function (done) {
        chai.request(app).get('/hq-run-simulation')
            .end(function (err, res) {
                expect(res.type).to.equal('text/html');
                expect(res.status).to.equal(200);
                done();
            });

    });

    it('ngo run sim should return status 200 and content type html', function (done) {
        chai.request(app).get('/ngo-simulation')
            .end(function (err, res) {
                expect(res.type).to.equal('text/html');
                expect(res.status).to.equal(200);
                done();
            });

    });

    it('hq create should return status 200 and content type html', function (done) {
        chai.request(app).get('/hq-create')
            .end(function (err, res) {
                expect(res.type).to.equal('text/html');
                expect(res.status).to.equal(200);
                done();
            });

    });

    it('scenario-create-new should return status 200 and content type html', function (done) {
        chai.request(app).get('/scenario-create-new')
            .end(function (err, res) {
                expect(res.type).to.equal('text/html');
                expect(res.status).to.equal(200);
                done();
            });

    });

    it('scenario-create should return status 200 and content type html', function (done) {
        chai.request(app).get('/scenario-create')
            .end(function (err, res) {
                expect(res.type).to.equal('text/html');
                expect(res.status).to.equal(200);
                done();
            });

    });

    it('scenario-edit should return status 200 and content type html', function (done) {
        chai.request(app).get('/scenario-edit')
            .end(function (err, res) {
                expect(res.type).to.equal('text/html');
                expect(res.status).to.equal(200);
                done();
            });

    });

    it('/about return status 200 and content type html', function (done) {
        chai.request(app).get('/about')
            .end(function (err, res) {
                expect(res.type).to.equal('text/html');
                expect(res.status).to.equal(200);
                done();
            });

    });

    it('/help return status 200 and content type html', function (done) {
        chai.request(app).get('/help')
            .end(function (err, res) {
                expect(res.type).to.equal('text/html');
                expect(res.status).to.equal(200);
                done();
            });

    });


    it('upload correctly formed sim file should return status 302 1/5', function (done){
        chai.request(app).post('/upload')
            .attach('simFile', 'Tests/demoScenarioGood1.zip')
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                done();
            });

    });

    it('upload correctly formed sim file should return status 302 2/5', function (done){
        chai.request(app).post('/upload')
            .attach('simFile', 'Tests/demoScenarioGood2.zip')
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                done();
            });
    });

    it('upload correctly formed sim file should return status 302 3/5', function (done){
        chai.request(app).post('/upload')
            .attach('simFile', 'Tests/demoScenarioGood3.zip')
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                done();
            });
    });

    it('upload correctly formed sim file should return status 302 4/5', function (done){
        chai.request(app).post('/upload')
            .attach('simFile', 'Tests/demoScenarioGood4.zip')
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                done();
            });
    });

    it('upload correctly formed sim file should return status 302 5/5', function (done){
        chai.request(app).post('/upload')
            .attach('simFile', 'Tests/demoScenarioGood5.zip')
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                done();
            });
    });

    it('upload incorrectly formed sim file (no title) should return status 400', function (done){
        chai.request(app).post('/upload')
            .attach('simFile', 'Tests/demoScenarioBad1.zip')
            .end(function (err, res) {
                if(res.status != 400){
                    console.log(res);
                }
                expect(res.status).to.equal(400);
                done();
            });
    });

    it('upload incorrectly formed sim file (no ngo count) should return status 400', function (done){
        chai.request(app).post('/upload')
            .attach('simFile', 'Tests/demoScenarioBad2.zip')
            .end(function (err, res) {
                if(res.status != 400){
                    console.log(res);
                }
                expect(res.status).to.equal(400);
                done();
            });
    });

    it('upload incorrectly formed sim file (duration) should return status 400', function (done){
        chai.request(app).post('/upload')
            .attach('simFile', 'Tests/demoScenarioBad3.zip')
            .end(function (err, res) {
                if(res.status != 400){
                    console.log(res);
                }
                expect(res.status).to.equal(400);
                done();
            });
    });

    it('upload incorrectly formed sim file (no scale) should return status 400', function (done){
        chai.request(app).post('/upload')
            .attach('simFile', 'Tests/demoScenarioBad4.zip')
            .end(function (err, res) {
                if(res.status != 400){
                    console.log(res);
                }
                expect(res.status).to.equal(400);
                done();
            });
    });

    it('upload incorrectly formed sim file (no ngo definitions) should return status 400', function (done){
        chai.request(app).post('/upload')
            .attach('simFile', 'Tests/demoScenarioBad5.zip')
            .end(function (err, res) {
                if(res.status != 400){
                    console.log(res);
                }
                expect(res.status).to.equal(400);
                done();
            });
    });

    it('upload incorrectly formed sim file (no events) should return status 400', function (done){
        chai.request(app).post('/upload')
            .attach('simFile', 'Tests/demoScenarioBad6.zip')
            .end(function (err, res) {
                if(res.status != 400){
                    console.log(res);
                }
                expect(res.status).to.equal(400);
                done();
            });
    });

    it('upload incorrectly formed sim file (invalid xml) should return status 400', function (done){
        chai.request(app).post('/upload')
            .attach('simFile', 'Tests/demoScenarioBad7.zip')
            .end(function (err, res) {
                if(res.status != 400){
                    console.log(res);
                }
                expect(res.status).to.equal(400);
                done();
            });
    });

    it('upload incorrectly formed sim file (no file at all) should return status 400', function (done){
        chai.request(app).post('/upload')
            .attach('simFile', 'Tests/demoScenarioBad8.zip')
            .end(function (err, res) {
                if(res.status != 400){
                    console.log(res);
                }
                expect(res.status).to.equal(400);
                done();
            });
    });

    it('upload correct sim file into edit should return status 200', function (done){
        chai.request(app).post('/editor-upload')
            .attach('simFile', 'Tests/demoScenarioGood1.zip')
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                done();
            });
    });

    it('Test pdf pdf is created', function (done) {
        chai.request(app).get('/getReviewFile')
            .end(function (err, res) {
                expect(res.type).to.equal('application/pdf');
                expect(res.status).to.equal(200);
                done();
            });

    });

    it('Test scenario download', function (done) {
        chai.request(app).get('/download-save')
            .end(function (err, res) {
                expect(res.type).to.equal('application/zip');
                expect(res.status).to.equal(200);
                done();
            });
    });

    it('Test event pdf upload', function (done) {
        chai.request(app).post('/upload-event-file')
            .attach('upload', 'Tests/003 HQ Daily SitRep Request.pdf')
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                done();
            });
    });

    it('Test live event pdf upload', function (done) {
        chai.request(app).post('/upload-event-file-live')
            .attach('upload', 'Tests/003 HQ Daily SitRep Request.pdf')
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                done();
            });
    });

    it('Test library pdf upload', function (done) {
        chai.request(app).post('/upload-library-file')
            .attach('upload', 'Tests/003 HQ Daily SitRep Request.pdf')
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                done();
            });
    });

    describe("Socket Tests", function () {

        before(function (done) {
            chai.request(app).post('/upload')
                .attach('simFile', 'Tests/demoScenarioGood1.zip')
                .end(function (err, res) {
                    expect(res.status).to.equal(200);
                    done();
                });
        });

        after(function () {
            process.exit();
        });

        it('Should allow ngos to join', function (done) {
            var client1 = io.connect(socketURL, options);

            client1.on('connect', function (data) {
                client1.emit('join', 'ngo1');
                client1.on('loginState', function (data) {
                    expect(data).to.equal('accepted');
                    done();
                });

            });
        });


        it('Should reject present ngos', function (done) {
            var client2 = io.connect(socketURL, options);

            client2.on('connect', function (data) {
                client2.emit('join', 'ngo1');
                client2.on('loginState', function (data) {
                    expect(data).to.equal('rejected');
                    done();
                });

            });
        });

        it('Should reject garbage pass key', function (done) {
            var client2 = io.connect(socketURL, options);

            client2.on('connect', function (data) {
                client2.emit('join', 'garbage');
                client2.on('loginState', function (data) {
                    expect(data).to.equal('rejected');
                    done();
                });

            });
        });

        it('Transmited Message Should Be The Same As Returned Message', function (done) {
            var client = io.connect(socketURL, options);
            client.on('connect', function (data) {
                client.emit('join', 'ngo2');
                client.on('loginState', function (data) {
                    expect(data).to.equal('accepted');

                    var message = {
                        from: 'someone',
                        to: 'someone',
                        content: 'testMessage'
                    };
                    client.emit('message', {message});
                    client.on('message', function (data) {
                        expect(data.recievedMessage.content).to.equal('testMessage');
                        done();
                    });
                });


            });
        });

        it('First (only) passed message should be equal to testMessage', function (done) {
            var client = io.connect(socketURL, options);
            client.on('connect', function (data) {
                client.emit('join', 'ngo3');
                client.on('loginState', function (data) {
                    expect(data).to.equal('accepted');

                    client.emit('getPastMessages', "request", function (callbackData) {
                        console.log(callbackData.pastMessages[0].content);
                        expect(callbackData.pastMessages[0].content).to.equal('testMessage');
                        done();
                    });
                });


            });
        });

        it('Connected users list size should be the size of connected users thus far in the test', function (done) {
            var client = io.connect(socketURL, options);
            client.on('connect', function (data) {
                client.emit('join', 'ngo4');
                client.on('loginState', function (data) {
                    expect(data).to.equal('accepted');
                    client.emit('getConnected', "request", function (callbackData) {
                        expect(callbackData.connectedUsers.length).to.equal(5);
                        done();
                    });
                });


            });
        });

        it('NGO5 Name Request Should Return Peacedoves', function (done) {
            var client = io.connect(socketURL, options);
            client.on('connect', function (data) {
                client.emit('join', 'ngo5');
                client.on('loginState', function (data) {
                    expect(data).to.equal('accepted');
                    client.emit('nameRequest', "ngo5", function (callbackData) {
                        expect(callbackData.toString()).to.equal("Peacedoves");
                        done();
                    });
                });
            });
        });

        it('Check that simfile is consistent with inputed file values', function (done) {
            var client = io.connect(socketURL, options);
            client.on('connect', function (data) {
                client.emit('join', 'ngo6');
                client.on('loginState', function (data) {
                    expect(data).to.equal('accepted');
                    client.emit('simState', "request", function (callbackData) {
                        expect(callbackData.simData.title.toString()).to.equal("Sebadoah");
                        expect(callbackData.simData.ngoCount.toString()).to.equal('50');
                        expect(callbackData.simData.durationMs.toString()).to.equal('19800000');
                        expect(callbackData.simData.timeScale.toString()).to.equal('24');
                        expect(callbackData.simData.started).to.equal(false);
                        expect(callbackData.simData.modeOnline).to.equal(true);
                        expect(callbackData.simData.isRunning).to.equal(false);
                        done();
                    });
                });
            });
        });

        it('Respond to an event and check that the response has been saved correctly', function (done) {
            var client = io.connect(socketURL, options);
            client.on('connect', function (data) {
                client.emit('join', 'ngo7');
                client.emit('play', 'play');
                client.on('loginState', function (data) {
                    expect(data).to.equal('accepted');

                    var response = {
                        from: 'Peacedoves',
                        event: '0',
                        content: 'something'
                    };

                    client.emit('newEventResponse', {response});

                    var selectedEvent = 0;
                    client.emit('pastEventResponses', {selectedEvent}, function (callbackData) {
                        expect(callbackData.pastEventResponseList[0].content.toString()).to.equal('something');
                        done();
                    });

                });
            });
        });

        it('Check for export XML', function (done) {
            var client = io.connect(socketURL, options);
            client.on('connect', function (data) {
                var simData = {
                    loaded: false,
                    ready: false,
                    title: "Test",
                    ngoCount: 0,
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
                    EventTags: [],
                    ngoStatusReports: []
                };
                client.emit('exportXML', simData);
                client.on('xmlSaved', function () {
                    expect(true).to.equal(true);
                    done();
                });
            });
        });

        it('Check update event', function (done) {
            var client = io.connect(socketURL, options);
            client.on('connect', function (data) {
                var event = {
                    id: 0,
                    recipient: ['test'],
                    time: ['00:00:30'],
                    type: ['pdf'],
                    location: ['./Tests/003 HQ Daily SitRep Request.pdf'],
                    subject: ['test'],
                    responses: [],
                    latestUpdateTime: 0,
                    ChosenNGOTag: "Not Chosen"
                };
                client.emit('updateEvent', event);
                client.emit('simState', "request", function (callbackData) {
                    expect(callbackData.simData.eventsList[0].subject[0]).to.equal('test');
                    done();
                });
            });
        });

        it('Check add event', function (done) {
            var client = io.connect(socketURL, options);
            client.on('connect', function (data) {
                var event = {
                    id: 0,
                    recipient: ['test'],
                    time: ['00:00:30'],
                    type: ['pdf'],
                    location: ['./Tests/003 HQ Daily SitRep Request.pdf'],
                    subject: ['test'],
                    responses: [],
                    latestUpdateTime: 0,
                    ChosenNGOTag: "Not Chosen"
                };
                client.emit('addEvent', event);
                client.emit('simState', "request", function (callbackData) {
                    expect(callbackData.simData.eventsList[callbackData.simData.eventsList.length-1].subject[0]).to.equal('test');
                    done();
                });
            });
        });

        it('Check delete event', function (done) {
            var client = io.connect(socketURL, options);
            client.on('connect', function (data) {
                client.emit('deleteEvent', 1);
                client.emit('simState', "request", function (callbackData) {
                    console.log(callbackData.simData.eventsList);
                    expect(callbackData.simData.eventsList[callbackData.simData.eventsList.length]).to.equal(undefined);
                    done();
                });
            });
        });

        it('Check ngo status', function (done) {
            var client = io.connect(socketURL, options);
            client.on('connect', function (data) {
                var ngoStatusReport = {
                    hour: 1,
                    name: 'test',
                    status: 'OK'
                };
                client.emit('ngoStatusReport', {ngoStatusReport});
                client.emit('simState', "request", function (callbackData) {
                    expect(callbackData.simData.ngoStatusReports[0].name).to.equal('test');
                    done();
                });
            });
        });

    });

});




