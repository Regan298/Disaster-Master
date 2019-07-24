var request = require("supertest");


app = require('../server');
var agent = request.agent(app);

before(function (done) {
    app.on("appStarted", function(){
        done();
    });
});

describe("Add config",function(){
    it("Add a new connection",function(done){
        agent
            .post("/add_config")
            .expect(200)
            .expect("Config successfully added", done);
    });
});





















var supertest = require("supertest");
var should = require("should");


// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:80");

// UNIT test begin
app = require('../server');
var server = supertest.agent(app);

before(function (done) {
    app.on("appStarted", function(){
        done();
    });
});

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