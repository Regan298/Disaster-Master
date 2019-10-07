// var Stopwatch = require('statman-stopwatch');
var TimeFormat = require('hh-mm-ss');
var simLength;
var pastEvents = [];
var eventList = [];
const {parentPort} = require('worker_threads');

// const stopwatch = new Stopwatch();

console.log("init");

// stopwatch.start();
var timeS = 0;
var t;

function updateEvents(msg) {
	console.log('updateEvents');
	simLength = msg.durationMs;
	eventList = msg.eventsList;

	if(msg.isRunning || !msg.started) {
		t = setInterval(getEvents, 1000);
	}
}

parentPort.on('message', (msg) => {
	console.log('received in AE');
	if(typeof msg === "object"){
		console.log('object');
		clearInterval(t);
		updateEvents(msg);
		return;
	} else if (msg === 'pause') {
		console.log('Pause');
		// stopwatch.stop();
		clearInterval(t);
	} else{
		console.log('Play');
		// stopwatch.start();
		t = setInterval(getEvents,1000);
	}
});

// t = setInterval(getEvents,1000);

function getEvents(){
	console.log('her1');
	timeS++;
	if ((timeS*1000) < simLength) {
		console.log('her2');

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
			var et = eventList[i].time+'';
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
		};
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
