var Stopwatch = require("statman-stopwatch");
var TimeFormat = require('hh-mm-ss');
const util = require('util');
var simLength;
var pastEvents = [];
var eventList = [];
const { parentPort } = require('worker_threads');

const stopwatch = new Stopwatch();

parentPort.on('init', (simData) => {
	simLength = simData.durationMs;
	eventList = simData.eventList;
	stopwatch.start();
	grabEvent();
});

parentPort.on('pause', () => {
    stopwatch.stop();
});
parentPort.on('play', () => {
    stopwatch.start();
});

function grabEvent(){
	if(stopwatch.read() < simLength){
		wait(1000);
		
		var t = TimeFormat.fromMs(stopwatch.read(), 'hh:mm:ss');
		var now = new Date();
		t = t.split(":");
		now.setHours(t[0]);
		now.setMinutes(t[1]);
		now.setSeconds(t[2]);

		var eventTime;

		for(var i=0; i<eventList; i++){
			t = eventList[i].time.split(":");
			eventTime = new Date();
			eventTime.setHours(t[0]);
			eventTime.setMinutes(t[1]);
			eventTime.setSeconds(t[2]);

			if(eventTime < now){
				pastEvents.push(eventList[i]);
			}
		}
		parentPort.postMessage(pastEvents);

		//console.log(count);
	}else{
		endSim();
	}
}
	
function endSim(){
	stopwatch.stop();
	stopwatch.reset();
    console.log("end of simulation");
}

function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
}