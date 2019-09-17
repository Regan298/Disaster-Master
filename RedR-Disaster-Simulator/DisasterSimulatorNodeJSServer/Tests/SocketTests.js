var should = require('should');
var io = require('socket.io-client');
var supertest = require('supertest');
var request = supertest('localhost:80');
var server = require('../server')

const chai = require('chai');
const chaiHttp = require('chai-http');
const {expect} = chai;

var socketURL = 'http://localhost:80';

var options = {
    transports: ['websocket'],
    'force new connection': true
};

describe("Routing And File Tests", function () {
    it('home request should return status 200 and content type html', function (done) {
        request.get('/')
            .expect('Content-Type', /html/)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                done();
            });

    });

    it('simulation config should return status 200 and content type html', function (done) {
        request.get('/hq-config')
            .expect('Content-Type', /html/)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                done();
            });

    });

    it('run simulation should return status 200 and content type html', function (done) {
        request.get('/hq-run-simulation')
            .expect('Content-Type', /html/)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                done();
            });

    });

    it('ngo run sim should return status 200 and content type html', function (done) {
        request.get('/ngo-simulation')
            .expect('Content-Type', /html/)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                done();
            });

    });

    it('hq create should return status 200 and content type html', function (done) {
        request.get('/hq-create')
            .expect('Content-Type', /html/)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                done();
            });

    });

    it('scenario-create-new should return status 200 and content type html', function (done) {
        request.get('/scenario-create-new')
            .expect('Content-Type', /html/)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                done();
            });

    });

    it('scenario-create should return status 200 and content type html', function (done) {
        request.get('/scenario-create')
            .expect('Content-Type', /html/)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                done();
            });

    });

    it('scenario-edit should return status 200 and content type html', function (done) {
        request.get('/scenario-edit')
            .expect('Content-Type', /html/)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                done();
            });

    });

    it('/about return status 200 and content type html', function (done) {
        request.get('/about')
            .expect('Content-Type', /html/)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                done();
            });

    });

    it('/help return status 200 and content type html', function (done) {
        request.get('/help')
            .expect('Content-Type', /html/)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                done();
            });

    });


    it('upload correctly formed sim file should return status 302 1/5', function (done){
        request.post('/upload')
            .attach('simFile', 'Tests/demoScenarioGood1.zip')
            .end(function (err, res) {
                expect(res.status).to.equal(302);
                done();
            });
    });

    it('upload correctly formed sim file should return status 302 2/5', function (done){
        request.post('/upload')
            .attach('simFile', 'Tests/demoScenarioGood2.zip')
            .end(function (err, res) {
                expect(res.status).to.equal(302);
                done();
            });
    });

    it('upload correctly formed sim file should return status 302 3/5', function (done){
        request.post('/upload')
            .attach('simFile', 'Tests/demoScenarioGood3.zip')
            .end(function (err, res) {
                expect(res.status).to.equal(302);
                done();
            });
    });

    it('upload correctly formed sim file should return status 302 4/5', function (done){
        request.post('/upload')
            .attach('simFile', 'Tests/demoScenarioGood4.zip')
            .end(function (err, res) {
                expect(res.status).to.equal(302);
                done();
            });
    });

    it('upload correctly formed sim file should return status 302 5/5', function (done){
        request.post('/upload')
            .attach('simFile', 'Tests/demoScenarioGood5.zip')
            .end(function (err, res) {
                expect(res.status).to.equal(302);
                done();
            });
    });

    it('upload incorrectly formed sim file (no title) should return status 400', function (done){
        request.post('/upload')
            .attach('simFile', 'Tests/demoScenarioBad1.zip')
            .end(function (err, res) {
                expect(res.status).to.equal(400);
                done();
            });
    });

    it('upload incorrectly formed sim file (no ngo count) should return status 400', function (done){
        request.post('/upload')
            .attach('simFile', 'Tests/demoScenarioBad2.zip')
            .end(function (err, res) {
                expect(res.status).to.equal(400);
                done();
            });
    });

    it('upload incorrectly formed sim file (duration) should return status 400', function (done){
        request.post('/upload')
            .attach('simFile', 'Tests/demoScenarioBad3.zip')
            .end(function (err, res) {
                expect(res.status).to.equal(400);
                done();
            });
    });

    it('upload incorrectly formed sim file (no scale) should return status 400', function (done){
        request.post('/upload')
            .attach('simFile', 'Tests/demoScenarioBad4.zip')
            .end(function (err, res) {
                expect(res.status).to.equal(400);
                done();
            });
    });

    it('upload incorrectly formed sim file (no ngo definitions) should return status 400', function (done){
        request.post('/upload')
            .attach('simFile', 'Tests/demoScenarioBad5.zip')
            .end(function (err, res) {
                expect(res.status).to.equal(400);
                done();
            });
    });

    it('upload incorrectly formed sim file (no events) should return status 400', function (done){
        request.post('/upload')
            .attach('simFile', 'Tests/demoScenarioBad6.zip')
            .end(function (err, res) {
                expect(res.status).to.equal(400);
                done();
            });
    });

    it('upload incorrectly formed sim file (invalid xml) should return status 400', function (done){
        request.post('/upload')
            .attach('simFile', 'Tests/demoScenarioBad7.zip')
            .end(function (err, res) {
                expect(res.status).to.equal(400);
                done();
            });
    });

    it('upload incorrectly formed sim file (no file at all) should return status 400', function (done){
        request.post('/upload')
            .attach('simFile', 'Tests/demoScenarioBad8.zip')
            .end(function (err, res) {
                expect(res.status).to.equal(400);
                done();
            });
    });

    it('upload sim file into edit (no file at all) should return status 302', function (done){
        request.post('/editor-upload')
            .attach('simFile', 'Tests/demoScenarioGood1.zip')
            .end(function (err, res) {
                expect(res.status).to.equal(302);
                done();
            });
    });

});




describe("Socket Tests ", function () {

    before(function (done) {
        request.post('/upload')
            .attach('simFile', 'Tests/demoScenarioGood1.zip')
            .end(function (err, res) {
                expect(res.status).to.equal(302);
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


});