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

    test('home request should return status 200 and content type html ', () => {
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

    test('hq create should return status 200 and content type html  ', () => {
        return request(app)
            .get('/hq-create')
            .expect('Content-Type', /html/)
            .expect(200);
    });

    test('scenario-create-new should return status 200 and content type html  ', () => {
        return request(app)
            .get('/scenario-create-new')
            .expect('Content-Type', /html/)
            .expect(200);
    });

    test('/scenario-create should return status 200 and content type html  ', () => {
        return request(app)
            .get('/scenario-create')
            .expect('Content-Type', /html/)
            .expect(200);
    });

    test('/scenario-edit should return status 200 and content type html  ', () => {
        return request(app)
            .get('/scenario-edit')
            .expect('Content-Type', /html/)
            .expect(200);
    });

    test('/about should return status 200 and content type html  ', () => {
        return request(app)
            .get('/about')
            .expect('Content-Type', /html/)
            .expect(200);
    });

    test('/help should return status 200 and content type html  ', () => {
        return request(app)
            .get('/help')
            .expect('Content-Type', /html/)
            .expect(200);
    });


    test('upload correctly formed sim file should return status 302 1/5', () => {
        return request(app)
            .post('/upload')
            .type('file')
            .attach('simFile', 'RoutingAndFileTests/demoScenarioGood1.zip')
            .expect(302);

    }, 10000);

    test('upload correctly formed sim file should return status 302 2/5', () => {
        return request(app)
            .post('/upload')
            .type('file')
            .attach('simFile', 'RoutingAndFileTests/demoScenarioGood2.zip')
            .expect(302);

    }, 10000);

    test('upload correctly formed sim file should return status 302 3/5', () => {
        return request(app)
            .post('/upload')
            .type('file')
            .attach('simFile', 'RoutingAndFileTests/demoScenarioGood3.zip')
            .expect(302);

    }, 10000);

    test('upload correctly formed sim file should return status 302 4/5', () => {
        return request(app)
            .post('/upload')
            .type('file')
            .attach('simFile', 'RoutingAndFileTests/demoScenarioGood4.zip')
            .expect(302);

    }, 10000);

    test('upload correctly formed sim file should return status 302 5/5', () => {
        return request(app)
            .post('/upload')
            .type('file')
            .attach('simFile', 'RoutingAndFileTests/demoScenarioGood5.zip')
            .expect(302);

    }, 10000);


    test('upload incorrectly formed sim file (no title) should return status 400', () => {
        return request(app)
            .post('/upload')
            .type('file')
            .attach('simFile', 'RoutingAndFileTests/demoScenarioBad1.zip')
            .expect(400);

    }, 10000);

    test('upload incorrectly formed sim file (no ngo count) should return status 400', () => {
        return request(app)
            .post('/upload')
            .type('file')
            .attach('simFile', 'RoutingAndFileTests/demoScenarioBad2.zip')
            .expect(400);

    }, 10000);

    test('upload incorrectly formed sim file (duration) should return status 400', () => {
        return request(app)
            .post('/upload')
            .type('file')
            .attach('simFile', 'RoutingAndFileTests/demoScenarioBad3.zip')
            .expect(400);

    }, 10000);

    test('upload incorrectly formed sim file (no scale) should return status 400', () => {
        return request(app)
            .post('/upload')
            .type('file')
            .attach('simFile', 'RoutingAndFileTests/demoScenarioBad4.zip')
            .expect(400);

    }, 10000);

    test('upload incorrectly formed sim file (no ngo definitions) should return status 400', () => {
        return request(app)
            .post('/upload')
            .type('file')
            .attach('simFile', 'RoutingAndFileTests/demoScenarioBad5.zip')
            .expect(400);

    }, 10000);

    test('upload incorrectly formed sim file (no events) should return status 400', () => {
        return request(app)
            .post('/upload')
            .type('file')
            .attach('simFile', 'RoutingAndFileTests/demoScenarioBad6.zip')
            .expect(400);

    }, 10000);

    test('upload incorrectly formed sim file (invalid xml) should return status 400', () => {
        return request(app)
            .post('/upload')
            .type('file')
            .attach('simFile', 'RoutingAndFileTests/demoScenarioBad7.zip')
            .expect(400);

    }, 10000);

    test('upload incorrectly formed sim file (no file at all) should return status 400', () => {
        return request(app)
            .post('/upload')
            .type('file')
            .attach('simFile', 'RoutingAndFileTests/demoScenarioBad8.zip')
            .expect(400);

    }, 10000);

    test('upload sim file into edit (no file at all) should return status 400', () => {
        return request(app)
            .post('/editor-upload')
            .type('file')
            .attach('simFile', 'RoutingAndFileTests/demoScenarioGood1.zip')
            .expect(302);

    }, 10000);




});

