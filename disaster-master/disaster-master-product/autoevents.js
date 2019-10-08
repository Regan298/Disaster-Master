var TimeFormat = require('hh-mm-ss');
var simLength;
var pastEvents = [];
var eventList = [];
const {parentPort} = require('worker_threads');
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


function getEvents(){
	timeS++;
	if ((timeS*1000) < simLength) {
		pastEvents = [];
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
				pastEvents.push(eventList[i]);
			}
		}
	
		var data = {
			events: pastEvents,
			timeMs: timeS*1000
		};
		parentPort.postMessage(data);
	}else{
		clearInterval(t);
		endSim();
	}
}

function endSim(){
	console.log("end of simulation");
}
