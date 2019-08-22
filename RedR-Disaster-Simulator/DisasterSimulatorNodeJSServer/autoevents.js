// var Stopwatch = require('statman-stopwatch');
var TimeFormat = require('hh-mm-ss');
const util = require('util');
var simLength;
var pastEvents = [];
var eventList = [];
const { parentPort, workerData } = require('worker_threads');

// const stopwatch = new Stopwatch();

console.log("init");
simLength = workerData.durationMs;
eventList = workerData.eventsList;
// stopwatch.start();
var timeS = 0;
var t;

parentPort.on('message', (msg) => {
	if (msg === 'pause') {
		console.log('Pause');
		// stopwatch.stop();
		clearInterval(t);
	} else {
		console.log('Play');
		// stopwatch.start();
		t = setInterval(getEvents,1000);
	}
});

t = setInterval(getEvents,1000);

function getEvents(){
	timeS++;
	if ((timeS*1000) < simLength) {

		pastEvents = [];

		// console.log(stopwatch.read());

	
		var t = TimeFormat.fromMs((timeS*1000), 'hh:mm:ss');
		var now = new Date();
		t = t.split(":");
		now.setHours(t[0]);
		now.setMinutes(t[1]);
		now.setSeconds(t[2]);
	
		var eventTime;
	
		for (var i = 0; i < eventList.length; i++) {
			var et = eventList[i].time+''
			t = et.split(":");
			eventTime = new Date();
			eventTime.setHours(t[0]);
			eventTime.setMinutes(t[1]);
			eventTime.setSeconds(t[2]);

			if (eventTime <= now) {
				// console.log('found past event');
				pastEvents.push(eventList[i]);
			}
		}
	
		var data = {
			events: pastEvents,
			timeMs: timeS*1000
		}
		parentPort.postMessage(data);
		//console.log(count);
	}else{
		clearInterval(t);
		endSim();
	}
}

function endSim(){
	// stopwatch.stop();
	// stopwatch.reset();
	console.log("end of simulation");
}

function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
}