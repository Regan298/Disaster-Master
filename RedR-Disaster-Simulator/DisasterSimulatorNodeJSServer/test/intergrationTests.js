var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:80");

// UNIT test begin

describe("SAMPLE unit test",function(){

    // #1 should return home page

    it("should return home page",function(done){

        // calling home page api
        server
            .get("/")
            .expect(200) // THis is HTTP response
            .end(function(err,res){
                // HTTP status should be 200
                res.status.should.equal(200);
                // Error key should be false.

                done();
            });
    });

});