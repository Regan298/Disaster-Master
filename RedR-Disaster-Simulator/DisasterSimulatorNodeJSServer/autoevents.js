var Stopwatch = require("statman-stopwatch");
var TimeFormat = require('hh-mm-ss');
const util = require('util');
var simLength;
var events = [];
const { parentPort } = require('worker_threads');
var mysql = require('promise-mysql');
var con;

const stopwatch = new Stopwatch();

parentPort.on('message', (msg) => {
	console.log(msg);
	simLength = msg;
	stopwatch.start();
	grabEvent();
});

function grabEvent(){
	mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "root",
		database: "simulationData"
	}).then(function loop(conn){
		con = conn;
		
		if(stopwatch.read() < simLength){
			wait(1000);
			
			var result = con.query("SELECT * FROM timelineevents WHERE Time = '"+(TimeFormat.fromMs(stopwatch.read(), 'hh:mm:ss'))+"'").then(function(rows){
				for(var i=0; i<rows.length; i++){
					events.push(rows[i]);
				}
				parentPort.postMessage(events);
				loop(conn);
			});

			//console.log(count);
		}else{
			conn.end();
			endSim();
		}
		
	});
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