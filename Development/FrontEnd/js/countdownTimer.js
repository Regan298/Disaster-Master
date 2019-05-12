var countdownDuration = 10000000;


//get current time + countdown Duration
var endTime = new Date().getTime()+countdownDuration;

// Update countdown every second
var time = setInterval(function() {

  // Get current time
  var currentTime = new Date().getTime();

  // Find remaning time until endtime
  var remainingTime = endTime - currentTime;

  // Calculate hours, minutes and seconds
  var hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

 //display remaining time
 if(hours==0){
	 document.getElementById("countdownTimer").innerHTML = minutes + "m " + seconds + "s ";
 } else {
	 document.getElementById("countdownTimer").innerHTML = hours + "h " + minutes + "m " + seconds + "s ";
 }

  // When time up display text 
  if (remainingTime < 0) {
    clearInterval(time);
    document.getElementById("countdownTimer").innerHTML = "EXPIRED";
  }
}, 1000);