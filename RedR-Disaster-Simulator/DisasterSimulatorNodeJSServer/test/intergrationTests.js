var app = require('../server');
var chai = require('chai');
var request = require('supertest');

var expect = chai.expect;

describe('API Tests', function() {
    it('should return version number', function(done) {
        request(app)
            .get('/testing')
            .end(function(err, res) {
                expect(res.statusCode).to.equal(200);
                done();
            });
    });
});

after(function() {
    // runs after all tests in this block
    process.exit();
});