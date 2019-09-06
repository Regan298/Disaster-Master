const socket = io();
var name;
var ngos = [];
var eventList = [];
var simulationDuration = 0;
var selectedNGOChat;
var selectedEvent;
var nameNotRecieved = true;
var simData;
var haveProcessedPastMessages = false;
var startDuration;
var firstTimeReccieve = true;
var eventDisplayCounter = 0;
var eventResponseList = [];

//Runs in Background and gets new and past users on a period
function handleNGOJoining() {
    socket.emit('getConnected', "request", function (callbackData) {
        processNGOData(callbackData.connectedUsers);
        for (var i = 0; i < ngos.length; i++) {
            let currentUserName = new String(ngos[i].name).trim().replace(" ", "_");
            if (currentUserName !== "HQ" && currentUserName !== name) {
                try {
                    document.getElementById(currentUserName).style.visibility = "visible";
                } catch (e) {
                    console.log(currentUserName);
                }
            }
        }

        //handle past messages after ngo list recieved
        if (!haveProcessedPastMessages) {
            handlePersistentMessages();
            haveProcessedPastMessages = true;
        }

    });
}

//Sets ngos after removing this as a user
function processNGOData(recievedNGOs) {
    ngos = [];
    for (var i = 0; i < recievedNGOs.length; i++) {
        let currentUserName = new String(recievedNGOs[i].name).trim();
        if (currentUserName !== name) {
            ngos.push(recievedNGOs[i]);
            //console.log(ngos[i].name);
            ngos[ngos.length - 1].name = new String(ngos[ngos.length - 1].name).trim().replace(" ", "_");
        }
    }
}


//handle the communication button value and ids to be ngo name and id
function handleCommunicationButtonsAndMessages(callback) {
    var buttons = document.getElementsByClassName("btn btn-secondary");
    var messagingChats = document.getElementsByClassName("messagingContentNGO");
    buttons[0].innerHTML = "HQ";
    buttons[0].id = "HQ";
    buttons[0].setAttribute("onclick", "switchNGOChat('" + "HQ" + "')")
    var ngosTemp = [];
    for (var i = 0; i < simData.ngoList.length; i++) {
        let currentUserName = new String(simData.ngoList[i].name).trim().replace(" ", "_");

        if (currentUserName !== name) {

            ngosTemp.push(simData.ngoList[i]);
        } else {
            console.log("skippedmyname");
        }
    }


    for (var i = 1; i <= ngosTemp.length; i++) {
        let currentUserName = new String(ngosTemp[i - 1].name).trim().replace(" ", "_");

        buttons[i].innerHTML = currentUserName;
        buttons[i].id = currentUserName;
        buttons[i].setAttribute("onclick", "switchNGOChat('" + currentUserName + "')");

        //buttons[i] = "switchNGOChat('" + currentUserName + "')";
        buttons[i].style.visibility = "hidden";
    }


    for (var i = 1; i <= ngosTemp.length; i++) {
        messagingChats[i].id = new String(ngosTemp[i - 1].name).trim().replace(" ", "_") + "Content";
    }

    //remove extra buttons and chats


    var buttonsCount = buttons.length;

    for (var j = ngosTemp.length; j < buttonsCount - 1; j++) {
        buttons[ngosTemp.length + 1].remove();
        messagingChats[ngosTemp.length + 1].remove();
    }

    //Start lisening for ngos joining
    callback();

}


function displayRemainingTime(timerElement, timeRemaining) {
    if(timeRemaining == 0){
        timerElement.innerHTML = "Simulation Not Running"
    } else {
        var seconds = Math.floor((timeRemaining / 1000) % 60);
        var minutes = Math.floor((timeRemaining / 1000 / 60) % 60);
        var hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
        timerElement.innerHTML = hours + "h" + minutes + "m" + seconds + "s";
    }

}

//Switch the chat recipient based on what chat is selctected
function switchNGOChat(ngo) {

    //Highlight selected button and unlight non selected
    if (ngo != null) {
        buttons = document.getElementsByClassName("btn btn-secondary");
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].style.backgroundColor = "#b5b5b5";
        }
        document.getElementById(ngo).style.backgroundColor = "#EE2A2B";
        selectedNGOChat = ngo;
    }
    // Hide all elements with class="messaging content" by default */

    var messagingContent = document.getElementsByClassName("messagingContentNGO");

    for (i = 0; i < messagingContent.length; i++) {
        messagingContent[i].style.display = "none";
    }

    // Show the specific message content
    if (ngo != null) {

        var value;
        if (ngo == "HQ") {
            value = "ngo0Content";
        } else {
            value = ngo + "Content";
        }
        document.getElementById(value).style.display = "inline-block";
    }
}

function addToConversation(content, isOrigin, from, to) {


    if (isOrigin) {
        if (to == "HQ") {
            to = "ngo0Content";
        } else {
            to = to.trim().replace(" ", "_") + "Content";
        }

        var childUl = $("#" + to).find('.messageList');

        $(childUl).append("<li id='origin'>" + content + "</li>");
    } else {

        //Return if messages not adressed to self and not a broadcast
        if (to !== name && to !== 'all') {
            console.log(to);
            return;

        }


        var value;

        for (var i = 0; i < ngos.length; i++) {

            if (ngos[i].name == from) {
                if (from == "HQ") {
                    value = "ngo0Content";
                } else {
                    value = from.replace(" ", "_") + "Content";
                }
                break;
            }
        }


        var childUl = $("#" + value).find('.messageList');

        $(childUl).append("<li id='nonOrigin'>" + content + "</li>");
    }
}


function loadNGOTitle() {

    var url = window.location.href; // or window.location.href for current url
    var key = /key=([^&]+)/.exec(url)[1]; // Value is in [1] ('384' in our case)


    socket.emit('nameRequest', key.toString(), function (callbackData) {
        name = callbackData;
        name = name.trim().replace(" ", "_");
        var htmlContent = "<h1 class='titles'><span>NGO: " + name + "</span></h1>";
        $(htmlContent).appendTo(".ngoTitle");
        nameNotRecieved = false;

        handleCommunicationButtonsAndMessages(function () {
            setInterval(handleNGOJoining, 1000);

        });
    });
}


function processScenarioData() {
    socket.emit('simState', "request", function (callbackData) {
        simData = callbackData.simData;
        recieveEvents();
        loadNGOTitle();

        //handleEventResponseListening();

    });
}

function handlePersistentMessages() {
    socket.emit('getPastMessages', "request", function (callbackData) {
        if (callbackData.pastMessages != null) {

            for (var i = 0; i < callbackData.pastMessages.length; i++) {
                let currentPastMessage = callbackData.pastMessages[i];
                var isOrigin;
                if (currentPastMessage.sender.replace(" ", "_") === name) {
                    isOrigin = true;
                } else {
                    isOrigin = false;
                }
                addToConversation(currentPastMessage.content, isOrigin, currentPastMessage.sender.replace(" ", "_"), currentPastMessage.recipient.replace(" ", "_"));

            }
        }


    });

}


function displayPDFOff() {
    document.getElementById("pdfOverlay").style.display = "none";
}

function displayEventMedia(type, name) {

    //pdf
    //image
    //audio
    //video

    console.log(name);

    document.getElementById("pdfOverlay").style.display = "none";
    document.getElementById("audioOverlay").style.display = "none";
    document.getElementById("imageOverlay").style.display = "none";
    document.getElementById("videoOverlay").style.display = "none";

    if (type == "video") {
        document.getElementById("videoOverlay").style.display = "block";
    } else if (type == "pdf") {
        PDFObject.embed("/files/" + name, "#pdfOverlay");
        document.getElementById("pdfOverlay").style.display = "block";
    } else if (type == "audio") {
        document.getElementById("audioOverlay").style.display = "block";
    } else if (type == "image") {
        document.getElementById("imageOverlay").style.display = "block";
    }
}


function videoPausePlay() {
    var video = document.getElementById("videoID");
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function videoOverlayOff() {
    var video = document.getElementById("videoID");
    video.pause();
    document.getElementById("videoOverlay").style.display = "none";
}


function audioPausePlay() {
    var audio = document.getElementById("audioID");
    var audioButton = document.getElementById("audioButton");
    if (audio.paused) {
        audio.play();
        audioButton.innerHTML = "Playing";
    } else {
        audio.pause();
        audioButton.innerHTML = "Paused";
    }
}

function audioOverlayOff() {
    var audio = document.getElementById("audioID");
    audio.pause();
    document.getElementById("audioOverlay").style.display = "none";
}

function imageOverlayOff() {
    document.getElementById("imageOverlay").style.display = "none";
}

/*
function handleEventResponseListening() {
    socket.on('ngoEventResponseRecieving', function (received) {
        received.eventForSending.timeRecieved = new Date().getTime();
        eventResponseList.push(received.eventForSending);
        console.log(received.eventForSending);
    });
}
*/

function displayEvent(eventId) {
    console.log(eventId);
    selectedEvent = document.getElementById(eventId).getAttribute("eventID");
    //selectedEvent = eventId;

    var eventViewerElement = document.getElementById("eventViewerNGO");
    eventViewerElement.parentNode.removeChild(eventViewerElement);

    $("#inboxElementNGO").append("<div id=\"eventViewerNGO\" class=\"eventViewerNGO\"></div>");

    var eventButtonElement = document.getElementById(eventId);
    var currentEventSubject = eventButtonElement.getAttribute("subject");
    var currentEventTime = eventButtonElement.getAttribute("time");

    var timeSplit = currentEventTime.toString().split(":");
    var h = parseInt(timeSplit[0], 10);
    var m = parseInt(timeSplit[1], 10);
    var s = parseInt(timeSplit[2], 10);
    var timeInMS = (h * 60 * 60 * 1000) + (m * 60 * 1000) + (s * 1000);
    var timeStamp = simData.durationMs - timeInMS;
    //convert ms back into string for display
    var seconds = Math.floor((timeStamp / 1000) % 60);
    var minutes = Math.floor((timeStamp / 1000 / 60) % 60);
    var hours = Math.floor((timeStamp / (1000 * 60 * 60)) % 24);
    var eventTimeFormat = hours + "h" + minutes + "m" + seconds;

    var currentEventType = eventButtonElement.getAttribute("type");
    var currentEventLocation = eventButtonElement.getAttribute("location");

    $("#eventViewerNGO").append("<h1> " + currentEventSubject + "</h1>" + "<h2> " + eventTimeFormat + "</h2>"
        + "<button id='displayEventButton' onclick=displayEventMedia(" + "'" + currentEventType + "'" + "," + "'" +
        currentEventLocation + "'" + ")" + ">View Event</button>");

    $("#eventViewerNGO").append("<div id=\"eventResponseViewerNGO\" class=\"eventResponseViewerNGO\"></div>");

    socket.emit('pastEventResponses', {selectedEvent}, function (callbackData) {
        let pastEventResponseList = callbackData.pastEventResponseList;
        addMessageToEventResponse(pastEventResponseList, false);

    });
}

function addMessageToEventResponse(responses, isorigin) {

    for (var i = 0; i < responses.length; i++) {
        var valSplit;
        if (isorigin) {
            valSplit = responses[i].split("\n");
        } else {
            valSplit = responses[i].content.split("\n");
        }
        for (var j = 0; j < valSplit.length; j++) {
            $("#eventResponseViewerNGO").append(valSplit[j] + "<br>");
        }

        $("#eventResponseViewerNGO").append("<hr>");
    }
}

function processEvent(event) {


    let currentEvent = event;
    let id = currentEvent.id;
    let location = currentEvent.location;
    let subject = currentEvent.subject;
    let time = currentEvent.time;
    let type = currentEvent.type;
    let latestTime = currentEvent.latestUpdateTime;

    //convert time string into ms for manipulation
    var timeSplit = time.toString().split(":");
    var h = parseInt(timeSplit[0], 10);
    var m = parseInt(timeSplit[1], 10);
    var s = parseInt(timeSplit[2], 10);
    var timeInMS = (h * 60 * 60 * 1000) + (m * 60 * 1000) + (s * 1000);
    var timeStamp = simData.durationMs - timeInMS;
    //convert ms back into string for display
    var seconds = Math.floor((timeStamp / 1000) % 60);
    var minutes = Math.floor((timeStamp / 1000 / 60) % 60);
    var hours = Math.floor((timeStamp / (1000 * 60 * 60)) % 24);
    var eventTimeFormat = hours + "h" + minutes + "m" + seconds;

    var potentialReplyValue = "";

    if (currentEvent.displayAsResponse) {
        potentialReplyValue = "RE: ";
    }
    $("#inboxEventListNGO").prepend("<button id='event" + eventDisplayCounter + "' class='eventObject'><p class='eventTitle'>" + potentialReplyValue + subject + "</p> " +
        "<p class='emailTime'>" + eventTimeFormat + "</p></button>");

    //Add event attribute to each event button

    var eventButton = document.getElementById("event" + eventDisplayCounter);
    eventButton.setAttribute("eventID", id);
    eventButton.setAttribute("onclick", "displayEvent('event" + eventDisplayCounter + "')");
    eventButton.setAttribute("location", location);
    eventButton.setAttribute("subject", potentialReplyValue + subject);
    eventButton.setAttribute("time", time);
    eventButton.setAttribute("type", type);
    eventButton.setAttribute("latestTime", latestTime);

    eventDisplayCounter++;
}

function recieveEvents() {
    //on receive event

    socket.on('occurredEvents', function (evnt) {

            eventList = [];
            for (var i = 0; i < evnt.occurredEvents.length; i++) {
                let currentEvent = evnt.occurredEvents[i];

                let to = currentEvent.recipient;
                if (to.toString().trim() === name) {

                    //loop through all of the response data correctly



                    for (var j = 0; j < currentEvent.responses.length; j++) {
                        //if event response is from opposite entity type add to event list
                        if (currentEvent.responses[j].sender === "HQ") {


                            //make copy of event for every response
                            var eventCopy = $.extend(true, {}, currentEvent);
                            eventCopy.displayAsResponse = true;
                            eventCopy.latestUpdateTime = eventCopy.responses[j].time;
                            eventList.push(eventCopy);
                        }
                    }

                    var timeSplit = currentEvent.time.toString().split(":");
                    var h = parseInt(timeSplit[0], 10);
                    var m = parseInt(timeSplit[1], 10);
                    var s = parseInt(timeSplit[2], 10);
                    var timeInMS = (h * 60 * 60 * 1000) + (m * 60 * 1000) + (s * 1000);
                    currentEvent.latestUpdateTime = timeInMS + simData.startTimeMS;

                    eventList.push(currentEvent);

                }
            }


            //sort events for displaying
            eventList.sort(eventComparator);


            $("button.eventObject").remove();
            eventDisplayCounter = 0;
            for (var i = 0; i < eventList.length; i++) {
                processEvent(eventList[i]);
            }


        }
    );
}

function eventComparator(e1, e2) {
    if (e1.latestUpdateTime < e2.latestUpdateTime) {
        return -1;
    }
    if (e1.latestUpdateTime > e2.latestUpdateTime) {
        return 1;
    }
    return 0;
}

function recieveCurrentTime() {
    socket.on('currentTime', function (time) {
        if (firstTimeReccieve) {
            startDuration = time;
            firstTimeReccieve = false;
        }
        simulationDuration = time;
        var timerElement = document.getElementById("simTime");
        displayRemainingTime(timerElement, simulationDuration);
    });
}

function displayDisclaimer() {
    //alert("The purpose of this tool is for training please keep this in mind throughout this simulation");

}

function handleMessageRecieving() {
    //on receive message
    socket.on('message', function (msg) {

        var from = msg.recievedMessage.from;
        var to = msg.recievedMessage.to;
        addToConversation(msg.recievedMessage.content, false, from, to)
    });

}


//On Page Load
$(function () {
    displayDisclaimer();
    processScenarioData();
    switchNGOChat();
    displayRemainingTime(document.getElementById("simTime"), 0);
    recieveCurrentTime();
    handleMessageRecieving();


    //New message form
    $('#messageNGOForm').submit(function (e) {

        e.preventDefault(); // prevents page reloading

        addToConversation($('#input').val(), true, null, selectedNGOChat);
        let recipient = document.getElementById(selectedNGOChat).innerHTML;


        var message = {
            from: name,
            to: recipient,
            content: $('#input').val()
        }

        $('#input').val('');
        socket.emit('message', {message});

    });

    //New Event Response Form
    $('#inboxNGOForm').submit(function (e) {

        e.preventDefault(); // prevents page reloading
        //Function takes array by default so add turn single message into array
        var responseAsArray = [];
        responseAsArray.push($('#inputEmailResponseNGO').val());
        addMessageToEventResponse(responseAsArray, true);
        var response = {
            from: name,
            event: selectedEvent,
            content: $('#inputEmailResponseNGO').val()
        }

        $('#inputEmailResponseNGO').val('');
        socket.emit('newEventResponse', {response});

    });


});
