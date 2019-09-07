var app = require('../server');
var http = require('http');
var request = require('supertest');

describe('Server Tests', () => {
    let server;
    const port = 80;

    beforeAll(done => {
        server = http.createServer(app);
        server.listen({port}, done);
    });

    afterAll(done => {
        server.close(done);
    });

    test('home request should return status 200 and content type html ',() => {
        return request(app)
            .get('/')
            .expect('Content-Type', /html/)
            .expect(200);
    });
    test('simulation config should return status 200 and content type html  ', () => {
        return request(app)
            .get('/hq-config')
            .expect('Content-Type', /html/)
            .expect(200);
    });
    test('run simulation should return status 200 and content type html  ', () => {
        return request(app)
            .get('/hq-run-simulation')
            .expect('Content-Type', /html/)
            .expect(200);
    });
    test('ngo config status should return status 200 and content type html  ', () => {
        return request(app)
            .get('/ngo')
            .expect('Content-Type', /html/)
            .expect(200);
    });
    test('ngo run sim should return status 200 and content type html  ', () => {
        return request(app)
            .get('/ngo-simulation')
            .expect('Content-Type', /html/)
            .expect(200);
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

