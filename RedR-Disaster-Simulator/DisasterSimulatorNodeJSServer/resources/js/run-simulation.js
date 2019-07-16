const socket = io();
var simTitle;
var ngos = [];
var started;
var events = [];
var rowCount = 0;
var selectedNGOChat;
var ngoNames;
var running = false;
var currentTime = 0;
var updateClockProcess;
var simulationDuration = 300000;


//Load Page Elements
//loadCommunication();
loadScenarioHeader();
//testing:
getTempPDF();
handleNGOS();


function runClock() {
    function updateClock() {
        currentTime = currentTime + 1000;
        var timerElement = document.getElementById("timeManagement");
        var timeRemaining = simulationDuration - currentTime;
        displayRemainingTime(timerElement, timeRemaining);

        if (timeRemaining == 0) {
            clearInterval(updateClockProcess);
        }
    }

    updateClockProcess = setInterval(updateClock, 1000);
}

function startStopSim() {

    if (!running) {
        running = true;
        doPlay();
        document.getElementById("playPauseSwitch").innerHTML="&#10074 &#10074";
    } else {
        running = false;
        doPause();
        document.getElementById("playPauseSwitch").innerHTML="&#9205";
    }

}

function displayRemainingTime(timerElement, timeRemaining) {

    var seconds = Math.floor((timeRemaining / 1000) % 60);
    var minutes = Math.floor((timeRemaining / 1000 / 60) % 60);
    var hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);


    timerElement.innerHTML = hours + "h" + minutes + "m" + seconds + "s";

}

function doPause() {
    clearInterval(updateClockProcess);
}

function doPlay() {
    runClock();
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
    socket.on('timelineEvents', function (events) {
        eventList = events.result;
        console.log("eventSize: " + eventList.length);
        for (var i = 0; i < eventList.length; i++) {
            var fileReference = eventList[i].Location;


            var htmlContent = "<button class=\"emailObject\"><p class=\"emailTitle\">Peacedoves Budget Request </p>\n" +
                "                                <p class=\"emailTime\">3:00PM</p></button>";

            $(htmlContent).appendTo(".inboxEmails");
            //For Demo
            break;

        }

    });

}


//Once Page Loaded
$(function () {
    var timerElement = document.getElementById("timeManagement");
    displayRemainingTime(timerElement, simulationDuration);
    updateEventList();
    //Update Communication Buttons

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

        var from = msg.recievedMessage.from;
        var to = msg.recievedMessage.to;
        if (from != "HQ") {
            addToConversation(msg.recievedMessage.content, false, from);
        }

    });

});

function addToConversation(content, isOrigin, from) {

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















