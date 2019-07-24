var Stopwatch = require("statman-stopwatch");
var TimeFormat = require('hh-mm-ss');
const util = require('util');
var simLength;
var pastEvents = [];
var eventList = [];
const { parentPort, workerData } = require('worker_threads');

const stopwatch = new Stopwatch();

parentPort.on('message', (msg) => {
    if (msg === 'pause') {
			console.log('Pause');
			stopwatch.stop();
		} else {
			console.log('Play');
			stopwatch.start();
		}
	});

console.log("init");
simLength = workerData.durationMs;
eventList = workerData.eventList;
stopwatch.start();

while (stopwatch.read() < simLength) {
    
	console.log(stopwatch.read());
    console.log("tick");
	parentPort.postMessage(pastEvents);
	wait(1000);

	var t = TimeFormat.fromMs(stopwatch.read(), 'hh:mm:ss');
	var now = new Date();
	t = t.split(":");
	now.setHours(t[0]);
	now.setMinutes(t[1]);
	now.setSeconds(t[2]);

	var eventTime;

	for (var i = 0; i < eventList; i++) {
		t = eventList[i].time.split(":");
		eventTime = new Date();
		eventTime.setHours(t[0]);
		eventTime.setMinutes(t[1]);
		eventTime.setSeconds(t[2]);

		if (eventTime < now) {
			pastEvents.push(eventList[i]);
		}
	}

	//console.log(count);
}
stopwatch.stop();
stopwatch.reset();
console.log("end of simulation");

function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
}