var app = require('../server');
var chai = require('chai');
var request = require('supertest');

var expect = chai.expect;

describe('Server Tests', function() {
    it('should return 200 for test request', function(done) {
        request(app)
            .get('/testing')
            .end(function(err, res) {
                console.log(res.statusCode);
                expect(res.statusCode).to.equal(200);
                done();
            });
    });
    it('home request should return status 200 and content type html ', function(done) {
        request(app)
            .get('/')
            .expect('Content-Type', /html/)
            .expect(200, done);
    });
    it('simulation config should return status 200 and content type html  ', function(done) {
        request(app)
            .get('/hq-config')
            .expect('Content-Type', /html/)
            .expect(200, done);
    });
    it('run simulation should return status 200 and content type html  ', function(done) {
        request(app)
            .get('/hq-run-simulation')
            .expect('Content-Type', /html/)
            .expect(200, done);
    });
    it('ngo config status should return status 200 and content type html  ', function(done) {
        request(app)
            .get('/ngo')
            .expect('Content-Type', /html/)
            .expect(200, done);
    });
    it('ngo run sim should return status 200 and content type html  ', function(done) {
        request(app)
            .get('/ngo-simulation')
            .expect('Content-Type', /html/)
            .expect(200, done);
    });

    /*it('upload correctly formed sim file should return status 302', function(done) {
        request(app)
            .post('/upload')
            .type('file')
            .attach('simFile', 'scenarioExample.xml')
            .expect(302, done);
    });

    it('upload non correctly formed sim file should return status 400', function(done) {
        request(app)
            .post('/upload')
            .type('file')
            .expect(400, done);
    });*/



});

after(function() {
    // runs after all tests in this block
    process.exit();
});