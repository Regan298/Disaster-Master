const socket = io();
var simTitle;
var ngos = [];
var started;
var initStart = true;
var events = [];
var rowCount = 0;
var selectedNGOChat;
var ngoNames;
var running = false;
var currentTime = 0;
var updateClockProcess;
var simulationDuration = 0;
var timeScale = 0;
var pauseTimeline;
var timeline;
var realCountdown = false;


//Load Page Elements
//loadCommunication();
loadScenarioHeader();
//testing:
getTempPDF();
handleNGOS();


// function runClock() {
//     function updateClock() {
//         currentTime = currentTime + 1000;
//         var timerElement = document.getElementById("timeManagement");
//         var timeRemaining = simulationDuration - currentTime;
//         displayRemainingTime(timerElement, timeRemaining);

//         if (timeRemaining == 0) {
//             clearInterval(updateClockProcess);
//         }
//     }

//     updateClockProcess = setInterval(updateClock, 1000);
// }

function startStopSim() {
    if(initStart){
        console.log('initial start');
        timeline.setCurrentTime(startDate);
        timeline.redraw();
        initStart = false;
    }
    if (!running) {
        running = true;
        socket.emit('play', true);
        doPlay();
        document.getElementById("playPauseSwitch").innerHTML="&#10074 &#10074";
    } else {
        running = false;
        socket.emit('pause', true);
        doPause();
        document.getElementById("playPauseSwitch").innerHTML="&#9205";
    }

}
//real time countdown
function realDisplayRemainingTime(timerElement, timeRemaining) {

    var seconds = Math.floor((timeRemaining / 1000) % 60);
    var minutes = Math.floor((timeRemaining / 1000 / 60) % 60);
    var hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);

    timerElement.innerHTML = hours + "h" + minutes + "m" + seconds + "s";

}

//sim time countdown
function simDisplayRemainingTime(timerElement, timeRemaining) {

    var seconds = Math.floor((timeRemaining / 1000) % 60);
    var minutes = Math.floor((timeRemaining / 1000 / 60) % 60);
    var hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
    var days = Math.floor((timeRemaining / (1000 * 60 * 60)) / 24);

    timerElement.innerHTML = "Day: "+days+" "+hours + "h" + minutes + "m" + seconds + "s";

}

function doPause() {
    //clearInterval(updateClockProcess);
    pauseTimeline = setInterval(pauseTimeline, 100);
}

function pauseTimeline(){
    timeline.setCurrentTime(startDate);
    timeline.redraw();
}

function doPlay() {
    clearInterval(pauseTimeline);
    //runClock();
}


function loadScenarioHeader() {

    socket.on('simState', function (data) {
        if (!started) {
            console.log("HERE");
            started = true;
            simTitle = data.simData.title;
            var url = document.URL.split('/');
            url = url[2] + "/ngo";

            var htmlContent = "<h1 class='titles'><span>Scenario: " + simTitle + "</span></h1>" +
                "<p class='lead'> Please inform your NGO's to go to this page: " + url + "</p>";

            $(htmlContent).appendTo(".scenarioTitle");

        }
    });
}



/*function getNGONames() {*/


/*}*/


function handleNGOS() {

    //New NGOS
    socket.on('ngoList', function (data) {

        ngos = data.ngoUsers;
        if (ngos != null) {
            let currentNGOName = ngos[ngos.length - 1].name;

            console.log("id: " + ngos[ngos.length - 1].id);

            document.getElementById(ngos[ngos.length - 1].id).style.visibility = "visible";
        }

    });


}


function switchNGOChat(ngo) {

    //Highlight selected button and unlight non selected
    if (ngo != null) {

        buttons = document.getElementsByClassName("btn btn-secondary");
        for (i = 0; i < buttons.length; i++) {
            buttons[i].style.backgroundColor = "#b5b5b5";
        }

        document.getElementById(ngo).style.backgroundColor = "#EE2A2B";
        selectedNGOChat = ngo;
    }


    // Hide all elements with class="messaging content" by default */
    var i, tabcontent, tablinks;
    messagingContent = document.getElementsByClassName("messagingContent");

    for (i = 0; i < messagingContent.length; i++) {
        messagingContent[i].style.display = "none";
    }


    // Show the specific message content
    if (ngo != null) {

        document.getElementById(ngo + "Content").style.display = "inline-block";
    }
}

function updateEventList() {
    socket.on('occurredEvents', function (received) {

        var timelineStartDate = new Date('2019', '01' - 1, '01', '00', '00', '00');
        var scaledTime = timelineStartDate.getTime() + (received.time*timeScale);
        scaledTime = new Date(scaledTime);
        timeline.setCurrentTime(scaledTime);
        timeline.redraw();
        
        eventList = received.occurredEvents;
        console.log("eventSize: " + eventList.length);
        $(".inboxEmails").empty();
        for (var i = 0; i < eventList.length; i++) {
            var fileReference = eventList[i].Location;

            var htmlContent = "<button class=\"emailObject\"><p class=\"emailTitle\">"+eventList[i].subject[0]+"</p>\n" +
                "                                <p class=\"emailTime\">"+eventList[i].time[0]+"</p></button>";

            $(htmlContent).appendTo(".inboxEmails");

        }

    });

}


//Once Page Loaded
$(function () {
    updateEventList();
    //Update Communication Buttons

    document.getElementById('simTime').style.display = 'inline';
    document.getElementById('realTime').style.display = 'none';

    $('.toggle').on('click', function(event){
        event.preventDefault();
        $(this).toggleClass('active');
        console.log(event);
        if(realCountdown){
            realCountdown = false;
            document.getElementById('simTime').style.display = 'inline';
            document.getElementById('realTime').style.display = 'none';
            timerElement = document.getElementById("simTime");
            simDisplayRemainingTime(timerElement, simulationDuration*timeScale);
        }else{
            realCountdown = true;
            document.getElementById('simTime').style.display = 'none';
            document.getElementById('realTime').style.display = 'inline';
            timerElement = document.getElementById("realTime");
            realDisplayRemainingTime(timerElement, simulationDuration);
        }
        
    });

    fillCommunicationButtons();

    //Load PDF
    //PDFObject.embed("/files/test.pdf", "#emailViewer");
    //Needed to auto hide placeholder messaging content
    switchNGOChat();
    $('#messageHQ').submit(function (e) {
        e.preventDefault(); // prevents page reloading
        // Add send message to ngo conversation

        addToConversation($('#input').val(), true, null);

        //Find actual Name of NGO
        let name = document.getElementById(selectedNGOChat).innerHTML;



        var message = {
            from: 'HQ',
            to: name,
            content: $('#input').val()
        }

        $('#input').val('');
        socket.emit('message', {message});

    });

    socket.on('message', function (msg) {
        console.log("messagerecieved");

        var from = msg.recievedMessage.from;
        var to = msg.recievedMessage.to;
        if (from != "HQ") {
            addToConversation(msg.recievedMessage.content, false, from);
        }

    });
    
    socket.on('duration', function(duration){
        simulationDuration = duration;
        var d = new Date(startDate.getTime()+(simulationDuration*timeScale));
        options.max = d;
        var container = document.getElementById('visualization');
        timeline = new vis.Timeline(container, items, groups, options);
        initDraw = false;
        // console.log(startDate.getTime());
        // console.log(timeScale);
        // console.log(simulationDuration);
        console.log(startDate);
        console.log(endDate);
        //endDate.setHours('24');
        var timerElement;
        timerElement = document.getElementById("realTime");
        realDisplayRemainingTime(timerElement, simulationDuration);
        timerElement = document.getElementById("simTime");
        simDisplayRemainingTime(timerElement, simulationDuration*timeScale);
        
    });

    socket.on('timeScale', function(scale){
        timeScale = scale;
    });

    socket.on('currentTime', function (time){
        simulationDuration = time;
        if(realCountdown){
            timerElement = document.getElementById("realTime");
            realDisplayRemainingTime(timerElement, simulationDuration);
        }else{
            timerElement = document.getElementById("simTime");
            simDisplayRemainingTime(timerElement, simulationDuration*timeScale);
        }
    });
});

function addToConversation(content, isOrigin, from) {
    console.log(from);
    console.log("to" + from);

    if (isOrigin) {
        $("#" + selectedNGOChat + "Content").append("<li id='origin'>" + content + "</li>");
    } else {

        var ngoId;


        for (i = 0; i < ngos.length; i++) {
            if (ngos[i].name == from) {
                ngoId = ngos[i].id;
            }
        }

        console.log(ngoId);

        $("#" + ngoId + "Content").append("<li id='nonOrigin'>" + content + "</li>");
    }
}

function fillCommunicationButtons() {

    socket.on('currentNGONames', function (data) {

        ngoNames = data.ngoNames;


        var buttons = document.getElementsByClassName("btn btn-secondary");

        for (i = 0; i < buttons.length; i++) {
            buttons[i].innerHTML = ngoNames[i];
        }

    });



}

function displayPDF(){
    document.getElementById("eventOverlay").style.display = "block";
}

function displayPDFOff() {
    document.getElementById("eventOverlay").style.display = "none";
}

function getPDF(cellValue) {
    console.log(cellValue);
    PDFObject.embed(events[cellValue - 1].Location, "#outboxPdf");/*change my-container to pdf*/
}

function getTempPDF() {

}

function loadCommunication() {

    $("#communication").load("communication.html");


}


function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
}