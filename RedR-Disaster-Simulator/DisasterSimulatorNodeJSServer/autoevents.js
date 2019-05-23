var Stopwatch = require("statman-stopwatch");
const util = require('util');
var simLength;
var currentEvents = [];
const { parentPort } = require('worker_threads');
var mysql = require('promise-mysql');
var con;

function connectDB() {
	
	/*con.connect(function (err) {
		if (err) throw err;
		parentPort.postMessage('DB connection');
	});*/
}

function getData(){
	var sql = "SELECT location FROM timelineevents WHERE Recipient = '1'";
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("done query");
		console.log(result);
		currentEvents.push(result);
		parentPort.postMessage(currentEvents);
	});
}

parentPort.on('message', function(e) {
	simLength = e.data;
	
	//wait(3000);
	//stopwatch.start();
	grabEvent();
});

function grabEvent(){
	var count = 0;
	mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "root",
		database: "simulationData"
	}).then(function loop(conn){
		con = conn;
		
		if(count < 10){
			wait(500);
			var result = con.query("SELECT location FROM timelineevents WHERE Recipient = '1'").then(function(rows){
				parentPort.postMessage(rows);
				count++;
				loop(conn);
			});

			//console.log(count);
		}else{
			conn.end();
		}
		
	})
	/*var count = 0;
	while(count < 20){
		wait(500);
		getData();
		count++;
	}*/
	parentPort.postMessage('Hi');
	//endSim();
}
	
function endSim(){
	stopwatch.stop();
	stopwatch.reset();
}

function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
}