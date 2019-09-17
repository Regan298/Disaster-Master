var should = require('should');
var io = require('socket.io-client');
var supertest = require('supertest');
var request = supertest('localhost:80');

const chai = require('chai');
const chaiHttp = require('chai-http');
const {expect} = chai;

var socketURL = 'http://localhost:80';

var options = {
    transports: ['websocket'],
    'force new connection': true
};




describe("Socket Tests Seperate To First Tests Coz Jest Just Clowned Around", function () {

    let server;

    beforeEach(function () {
        server = require('./server');


       /* request.post('/upload')
            .attach('simFile', 'Tests/demoScenarioGood1.zip')
            .end(function (err, res) {
                expect(res.status).to.equal(302);
                done();
            });*/
    });

    afterEach(function () {
        server.close();
    });

    it('Should allow ngos to join', function (done) {  var client1 = io.connect(socketURL, options);
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