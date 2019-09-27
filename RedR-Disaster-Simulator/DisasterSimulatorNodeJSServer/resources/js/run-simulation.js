const socket = io();
var simTitle;
var ngos = [];
var started;
var initStart = true;
var events = [];
var selectedNGOChat;
var running = false;
var currentTime = 0;
var simulationDuration = 0;
var timeScale = 0;
var pauseTimeline;
var timeline;
var realCountdown = false;
var simData;
var haveProcessedPastMessages = false;
var selectedEvent;
var eventResponseList = [];
var eventCounter = 0;
var selectNGOFilter = 'default';
var selected;
var firstTimeViewingKeys = true;

//todo: Unccomment this when done
window.onbeforeunload = function() {
    //return "Generic Message (Browsers Prevent Custom Message For Security Purposes)";
};


function handleNGOJoining() {
    //New NGOS
    socket.emit('getConnected', "request", function (callbackData) {
        processNGOData(callbackData.connectedUsers);
        for (var i = 0; i < ngos.length; i++) {
            let currentUserName = new String(ngos[i].name).trim().replace(/ /g, "_");
            ;
            if (currentUserName !== "HQ") {
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
        ngos.push(recievedNGOs[i]);
        ngos[i].name = new String(ngos[i].name).trim().replace(/ /g, "_");
    }
}

function handlePersistentMessages() {
    socket.emit('getPastMessages', "request", function (callbackData) {
        if (callbackData.pastMessages != null) {

            for (var i = 0; i < callbackData.pastMessages.length; i++) {
                let currentPastMessage = callbackData.pastMessages[i];
                var isOrigin;
                if (currentPastMessage.sender.replace(/ /g, "_") === "HQ") {
                    isOrigin = true;
                } else {
                    isOrigin = false;
                }
                addToConversation(currentPastMessage.content, isOrigin, currentPastMessage.sender.replace(/ /g, "_"), currentPastMessage.recipient.replace(/ /g, "_"));

            }
        }


    });

}


function displayPasskeysOff() {
    document.getElementById('ngoPasskeyOverlay').style.display='none';
}

function loadScenarioHeader() {
    simTitle = simData.title;
    var url = document.URL.split('/');
    url = url[2] + "/ngo";
    var htmlContent;
    console.log(url);

    if (simData.modeOnline) {
        htmlContent = "<h1 class='titles'><span>Scenario: " + simTitle + "</span></h1>" +
            "<p class='lead'> [Online Mode]: Please inform your NGO's to go to this page: " + url + "</p>";
    } else {
        htmlContent = "<h1 class='titles'><span>Scenario: " + simTitle + "</span></h1>" +
            "<p class='lead'> [Offline Mode]: Please Open a New Tab For Each NGO: " + "</p>" + "<a href='" + "/ngo" + "'>" + url + "</a>";

    }

    if(simData.modeOnline == false){
        htmlContent += "<br>";
    }

    htmlContent += "<a href='" + "javascript:void(0);" + "' id='getPassKeys'>" + "NGO Passkeys" + "</a><br>";
    $(htmlContent).appendTo(".scenarioTitle");

    $(function() {
        $("#getPassKeys").click(function(e) {
            e.preventDefault(); // if desired...

            if(firstTimeViewingKeys) {

                var ngoPassKeyHTML = "<ul>";

                for (var ngo of simData.ngoList) {
                    ngoPassKeyHTML += "<li>" + ngo.name + ": " + ngo.passkey + "</li>";
                }

                ngoPassKeyHTML += "</ul>";
                $(ngoPassKeyHTML).appendTo("#ngoPasskeyContent");
                document.getElementById('ngoPasskeyOverlay').style.display='block';
                firstTimeViewingKeys = false;
            } else {
            document.getElementById('ngoPasskeyOverlay').style.display='block';
            }
        });
    });

}

function drawTimeline() {
    console.log("loadtimeline");
    simulationDuration = simData.durationMs[0];
    timeScale = simData.timeScale;
    var d = new Date(startDate.getTime() + (simulationDuration * timeScale));
    options.max = d;
    var container = document.getElementById('visualization');
    timeline = new vis.Timeline(container, items, groups, options);
    timeline.on('select', onSelect);
    initDraw = false;
    console.log(startDate);
    console.log(endDate);
    var timerElement;
    timerElement = document.getElementById("realTime");
    realDisplayRemainingTime(timerElement, simulationDuration);
    timerElement = document.getElementById("simTime");
    simDisplayRemainingTime(timerElement, simulationDuration * timeScale);

    for (var i = 0; i < simData.ngoList.length; i++) {
        console.log(simData.ngoList[i]);
        groups.push({
            id: simData.ngoList[i].id,
            content: simData.ngoList[i].name[0]
        });
    }

    if (!initDraw) {
        timeline.setGroups(groups);
    }

    for (var i = 0; i < simData.eventsList.length; i++) {
        var currentEvent = simData.eventsList[i];
        var id;
        var timelineStartDate = new Date('2019', '01' - 1, '01', '00', '00', '00');

        var ngoName = currentEvent.recipient[0];
        for (var k = 0; k < groups.length; k++) {
            if (groups[k].content === ngoName) {
                var t = currentEvent.time + '';
                t = t.split(":");
                var h = parseInt(t[0], 10);
                var m = parseInt(t[1], 10);
                var s = parseInt(t[2], 10);
                var ms = (h * 60 * 60 * 1000) + (m * 60 * 1000) + (s * 1000);
                var scaledTime = timelineStartDate.getTime() + (ms * timeScale);
                scaledTime = new Date(scaledTime);
                id = groups[k].id;
                console.log(currentEvent.type[0]);

                var ngoColor;
                if(currentEvent.type === 'pdf'){
                    ngoColor = 'background-color: red; color: white;'
                } else if(currentEvent.type === 'video'){
                    ngoColor = 'background-color: blue; color: white;'
                } else if(currentEvent.type === 'image'){
                    ngoColor = 'background-color: green; color: white;'
                } else if(currentEvent.type === 'audio'){
                    ngoColor = 'background-color: yellow; color: black;'
                }

                items.push({
                    id: currentEvent.id,
                    group: id,
                    content: currentEvent.subject[0],
                    location: currentEvent.location[0],
                    start: '2019-01-' + scaledTime.getDate() + ' ' + scaledTime.getHours() + ':' + scaledTime.getMinutes() + ':' + scaledTime.getSeconds(),
                    contentType: currentEvent.type,
                    recipient: currentEvent.recipient[0],
                    time: currentEvent.time[0],
                    style: ngoColor
                });
                break;
            }
        }
    }
    if (!initDraw) {
        timeline.setItems(items);
    }

}


function handleCommunicationButtons() {


    var buttons = document.getElementsByClassName("btn btn-secondary");
    var messagingChats = document.getElementsByClassName("messagingContentHQ");


    for (var i = 0; i < simData.ngoList.length; i++) {
        let currentUserName = new String(simData.ngoList[i].name).trim().replace(/ /g, "_");

        buttons[i].innerHTML = currentUserName;
        buttons[i].id = currentUserName;
        buttons[i].setAttribute("onclick", "switchNGOChat('" + currentUserName + "')")

        //buttons[i] = "switchNGOChat('" + currentUserName + "')";
        buttons[i].style.borderWidth = "thin";
        buttons[i].style.visibility = "hidden";
        switch (i) {
            case 0 :
                buttons[i].style.borderColor = "orange";
                break;
            case 1 :
                buttons[i].style.borderColor = "blue";
                break;
            case 2 :
                buttons[i].style.borderColor = "red";
                break;
            case 3 :
                buttons[i].style.borderColor = "green";
                break;
            case 4 :
                buttons[i].style.borderColor = "yellow";
                break;
            case 5 :
                buttons[i].style.borderColor = "pink";
                break;
        }
    }


    for (var i = 0; i < simData.ngoList.length; i++) {
        messagingChats[i].id = new String(simData.ngoList[i].name).trim().replace(/ /g, "_") + "Content";
    }

    //remove extra buttons and chats


    var buttonsCount = buttons.length;

    console.log(simData.ngoList.length); // 6
    console.log(buttonsCount); // 7

    for (var j = simData.ngoList.length + 1; j <= buttonsCount; j++) {
        buttons[simData.ngoList.length].remove();
        messagingChats[simData.ngoList.length].remove();
    }
}

function addMessageToEventResponse(responses, isOrigin) {
    for (var i = 0; i < responses.length; i++) {
        var valSplit;
        if (isOrigin) {
            valSplit = responses[i].split("\n");
        } else {
            valSplit = responses[i].content.split("\n");
        }

        for (var j = 0; j < valSplit.length; j++) {
            $("#eventResponseViewerHQ").append(valSplit[j] + "<br>");
        }
        if (!isOrigin) {
            if(responses[i].chosenNGOTag != null) {
                $("#eventResponseViewerHQ").append("<b>Chosen NGO Tag: " + responses[i].chosenNGOTag + "</b>");
            }
        }

        $("#eventResponseViewerHQ").append("<hr>");
    }
}

function displayEvent(eventId) {
    console.log(eventId);
    selectedEvent = document.getElementById(eventId).getAttribute("eventID");

    var eventViewerElement = document.getElementById("eventViewerHQ");
    eventViewerElement.parentNode.removeChild(eventViewerElement);

    $("#inboxElementHQ").append("<div id=\"eventViewerHQ\" class=\"eventViewerHQ\"></div>");

    var eventButtonElement = document.getElementById(eventId);
    var currentEventSubject = eventButtonElement.getAttribute("subject");
    var currentEventTime = eventButtonElement.getAttribute("time");
    var currentEventType = eventButtonElement.getAttribute("type");
    var currentEventLocation = eventButtonElement.getAttribute("location");

    $("#eventViewerHQ").append("<h1> " + currentEventSubject + "</h1>" + "<h2> " + currentEventTime + "</h2>"
        + "<button id='displayEventButton' onclick=displayEventMedia(" + "'" + currentEventType + "'" + "," + "'" +
        currentEventLocation + "'" + ")" + ">View Event</button>");

    $("#eventViewerHQ").append("<div id=\"eventResponseViewerHQ\" class=\"eventResponseViewerHQ\"></div>");

    socket.emit('pastEventResponses', {selectedEvent}, function (callbackData) {
        let pastEventResponseList = callbackData.pastEventResponseList;
        addMessageToEventResponse(pastEventResponseList, false);

    });
}


function fillInNGOFilter() {
    $("#ngoFilterHQ").append("<option value= 'default' > Events From All NGO's </option>");
    for(var i = 0; i < simData.ngoList.length; i++) {
        $("#ngoFilterHQ").append("<option value= " + simData.ngoList[i].name + ">" + simData.ngoList[i].name + "</option>");
    }

}

function filterEvents() {
    selectNGOFilter = document.getElementById("ngoFilterHQ").value;
    var eventButtons = document.getElementsByClassName('eventObject');

    for(var i = 0; i < eventButtons.length; i++){
        document.getElementById(eventButtons[i].getAttribute('id')).style.display = 'block';

        if(eventButtons[i].getAttribute('recipient') !== selectNGOFilter && selectNGOFilter !== 'default'   ){
            document.getElementById(eventButtons[i].getAttribute('id')).style.display = 'none';
        }

    }

}

function processScenarioData() {
    socket.emit('simState', "request", function (callbackData) {
        simData = callbackData.simData;
        if(simData.isRunning){
            document.getElementById("playPauseSwitch").innerHTML = "&#10074 &#10074";
            running = true;
        }
        loadScenarioHeader();
        drawTimeline();
        updateEventList();
        handleCommunicationButtons();
        setInterval(handleNGOJoining, 1000);
        fillInNGOFilter();
    });

}

function startStopSim() {
    if (initStart) {
        console.log('initial start');
        timeline.setCurrentTime(startDate);
        timeline.redraw();
        initStart = false;
    }
    if (!running) {
        running = true;
        socket.emit('play', true);
        simData.startTimeMS = new Date().getTime();
        doPlay();
        document.getElementById("playPauseSwitch").innerHTML = "&#10074 &#10074";
    } else {
        running = false;
        socket.emit('pause', true);
        doPause();
        document.getElementById("playPauseSwitch").innerHTML = "&#9205";
    }

}

//real time countdown
function realDisplayRemainingTime(timerElement, timeRemaining) {

    var seconds = Math.floor((timeRemaining / 1000) % 60);
    var minutes = Math.floor((timeRemaining / 1000 / 60) % 60);
    var hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);

    timerElement.innerHTML = hours + "h" + minutes + "m" + seconds + "s remaining";

}

//sim time countdown
function simDisplayRemainingTime(timerElement, timeRemaining) {

    var seconds = Math.floor((timeRemaining / 1000) % 60);
    var minutes = Math.floor((timeRemaining / 1000 / 60) % 60);
    var hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
    var days = Math.floor((timeRemaining / (1000 * 60 * 60)) / 24);

    timerElement.innerHTML = "Day: " + days + " " + hours + "h" + minutes + "m" + seconds + "s remaining";

}

function doPause() {
    //clearInterval(updateClockProcess);
    pauseTimeline = setInterval(pauseTimeline, 100);
}

function pauseTimeline() {
    timeline.setCurrentTime(startDate);
    timeline.redraw();
}

function doPlay() {
    clearInterval(pauseTimeline);
    //runClock();
}

function switchNGOChat(ngo) {

    //Highlight selected button and unlight non selected
    if (ngo != null) {

        buttons = document.getElementsByClassName("btn btn-secondary");
        for (i = 0; i < buttons.length; i++) {
            buttons[i].style.backgroundColor = "#b5b5b5";
        }

        document.getElementById(ngo).style.backgroundColor = document.getElementById(ngo).style.borderColor;
        selectedNGOChat = ngo;
    }


    // Hide all elements with class="messaging content" by default */

    var messagingContent = document.getElementsByClassName("messagingContentHQ");

    for (i = 0; i < messagingContent.length; i++) {
        messagingContent[i].style.display = "none";
    }


    // Show the specific message content
    if (ngo != null) {

        document.getElementById(ngo + "Content").style.display = "inline-block";
    }
}

function displayNGOEventResponse(ngoEventResponse) {
    let id = ngoEventResponse.id;
    let location = ngoEventResponse.location;
    let subject = ngoEventResponse.subject;
    let time = ngoEventResponse.time;
    let type = ngoEventResponse.type;
    let recipient = ngoEventResponse.recipient;

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
    var eventTimeFormat = hours + "h" + minutes + "m" + seconds + "s";

    var buttonHTMLString = "<button id='event" + eventCounter + "' class='eventObject'><p class='eventTitle'>" + "RE: " + subject
        + "<br>" + recipient + "</p> " +
        "<p class='emailTime'>" + eventTimeFormat + "</p></button>";

    $(buttonHTMLString).insertAfter("#ngoFilterHQ");

    //Add event attribute to each event button

    var eventButton = document.getElementById("event" + eventCounter);
    eventButton.setAttribute("eventID", id);
    eventButton.setAttribute("onmousedown", "displayEvent('event" + eventCounter + "')");
    eventButton.setAttribute("location", location);
    eventButton.setAttribute("subject", subject);
    eventButton.setAttribute("time", time);
    eventButton.setAttribute("type", type);
    eventButton.setAttribute("recipient", recipient);

    eventCounter++;
}

function handleNGOResponseEvents(occuredEvents) {

    eventList = [];
    //add occured events
    for (var i = 0; i < occuredEvents.length; i++) {
        let currentEvent = occuredEvents[i];
        for (var j = 0; j < currentEvent.responses.length; j++) {
            //if event response is from opposite entity type add to event list
            if (currentEvent.responses[j].sender !== "HQ") {
                //make copy of event for every response
                var eventCopy = $.extend(true, {}, currentEvent);
                eventCopy.displayAsResponse = true;
                eventCopy.latestUpdateTime = eventCopy.responses[j].time;
                eventList.push(eventCopy);
            }
        }
    }

    eventList.sort(eventComparator);
    $("button.eventObject").remove();
    eventCounter = 0;
    for (var i = 0; i < eventList.length; i++) {
        displayNGOEventResponse(eventList[i]);
    }
    filterEvents();


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

//Runs in background
function updateEventList() {
    socket.on('occurredEvents', function (received) {

        var timelineStartDate = new Date('2019', '01' - 1, '01', '00', '00', '00');
        var scaledTime = timelineStartDate.getTime() + (received.time * timeScale);
        scaledTime = new Date(scaledTime);
        timeline.setCurrentTime(scaledTime);
        timeline.redraw();
        handleNGOResponseEvents(received.occurredEvents);

    });

}

function updateCurrentTime() {

    socket.on('currentTime', function (time) {
        simulationDuration = time;
        if (realCountdown) {
            let timerElement = document.getElementById("realTime");
            realDisplayRemainingTime(timerElement, simulationDuration);
        } else {
            let timerElement = document.getElementById("simTime");
            simDisplayRemainingTime(timerElement, simulationDuration * timeScale);
        }

        if (time == 1000){
            socket.off('currentTime');
            window.open('/getReviewFile');
        }
    });

}

function handleTimeSwitcher() {
    document.getElementById('simTime').style.display = 'inline';
    document.getElementById('realTime').style.display = 'none';

    $('.toggle').on('click', function (event) {
        event.preventDefault();
        $(this).toggleClass('active');
        console.log(event);
        if (realCountdown) {
            realCountdown = false;
            document.getElementById('simTime').style.display = 'inline';
            document.getElementById('realTime').style.display = 'none';
            timerElement = document.getElementById("simTime");
            simDisplayRemainingTime(timerElement, simulationDuration * timeScale);
        } else {
            realCountdown = true;
            document.getElementById('simTime').style.display = 'none';
            document.getElementById('realTime').style.display = 'inline';
            timerElement = document.getElementById("realTime");
            realDisplayRemainingTime(timerElement, simulationDuration);
        }

    });

}

function addToConversation(content, isOrigin, from, to) {

    console.log(from);
    if (isOrigin) {
        if(to === 'all'){
            for (var i = 0; i < ngos.length; i++) {
                console.log(ngos[i].name);
                var childUl = $("#" + ngos[i].name + 'Content').find('.messageList');
                $(childUl).append("<li id='origin'>" + content + "</li>");
            }
        }
        to = to.trim().replace(/ /g, "_") + "Content";
        var childUl = $("#" + to).find('.messageList');
        $(childUl).append("<li id='origin'>" + content + "</li>");
    } else {

        if (to !== "HQ") {
            return;
        }

        var value;
        for (var i = 0; i < ngos.length; i++) {
            if (ngos[i].name === from) {
                value = from.replace(/ /g, "_") + "Content";
                break;
            }
        }

        console.log(value);
        var childUl = $("#" + value).find('.messageList');

        $(childUl).append("<li id='nonOrigin'>" + content + "</li>");
    }
}

function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
}


function displayPDFOff() {
    document.getElementById("pdfOverlay").style.display = "none";
}

function displayVideoOff() {
    var videoOverlay = document.getElementById("videoPlayer");
    videoOverlay.parentNode.removeChild(videoOverlay);
    document.getElementById("videoOverlay").style.display = "none";
}

function displayAudioOff() {
    var audioOverlay = document.getElementById("audioPlayer");
    audioOverlay.parentNode.removeChild(audioOverlay);
    document.getElementById("audioOverlay").style.display = "none";
}


function displayImageOff() {
    var imageOverlay = document.getElementById("imageDisplay");
    imageOverlay.parentNode.removeChild(imageOverlay);
    document.getElementById("imageOverlay").style.display = "none";
}

function displayEventMedia(type, name) {
    console.log(type);
    document.getElementById("pdfOverlay").style.display = "none";
    document.getElementById("audioOverlay").style.display = "none";
    document.getElementById("imageOverlay").style.display = "none";
    document.getElementById("videoOverlay").style.display = "none";
    if (type == "video") {
        $("#videoOverlay").append("<div style='text-align:center;'><video id='videoPlayer' height='500'; width='500'; style='text-align:center; margin-top: 5%' controls>\n" +
            "        <source src=' " + name + " ' type='video/mp4'>\n" +
            "    </video></div>");
        document.getElementById("videoOverlay").style.display = "block";
    } else if (type == "pdf") {
        console.log(name);
        PDFObject.embed(name, "#pdfOverlay");
        document.getElementById("pdfOverlay").style.display = "block";
    } else if (type == "audio") {
        $("#audioOverlay").append("<div style='text-align:center;'><audio id='audioPlayer' style='text-align:center; margin-top: 5%' controls>\n" +
            "            <source src=' " + name + "'type='audio/mpeg'>\n" +
            "            Your browser does not support the audio element.\n" +
            "        </audio></div>");
        document.getElementById("audioOverlay").style.display = "block";
    } else if (type == "image") {
        $("#imageOverlay").append("<div id='imageDisplay' style='text-align:center;'><img  style='margin-top: 5%' height='500px' width='500px' src= '" + name + "'></div>");
        document.getElementById("imageOverlay").style.display = "block";
    }
}


function handleNewMessages() {
    socket.on('message', function (msg) {
        var from = msg.recievedMessage.from;
        var to = msg.recievedMessage.to;
        if (from != "HQ") {
            addToConversation(msg.recievedMessage.content, false, from, to);
        }
    });
}

function submitMessage(isForAll, content) {

    if(content.toString().length <= 0){
        return;
    }

    // Add send message to ngo conversation
    if(!isForAll) {
        addToConversation(content, true, null, selectedNGOChat);
    } else {
        for(var i = 0; i < ngos.length; i++){
            var currentName = ngos[i].name;
            addToConversation(content, true, null, currentName);
        }
    }
    //Find actual Name of NGO
    var name;

    if(!isForAll) {
        name = document.getElementById(selectedNGOChat).innerHTML;
    } else {
        name = 'all';
    }
    var message = {
        from: 'HQ',
        to: name,
        content: content
    };
    socket.emit('message', {message});

}

function cancelEdit(){
    modal.style.display = "none";
    timeline.setSelection([]);
    selected = null;
    //this is here to stop audio/video events playing once the overlay is closed
    $("#modal").empty();
}

function addEvent(location){
    console.log('addEvent');
    let frmData = document.getElementById("addEvent");
    var newEvent = {
        id: simData.eventsList.length,
        recipient: '',
        time: '',
        type: '',
        location: '',
        subject: '',
        responses: [],
        latestUpdateTime: 0
    };
    let file = frmData.elements[5].files[0];
    if(file){
        uploadFiles(file, 'event');
        newEvent.location = ['/currentScenario/files/'+file.name];
        // var type = file.name.split(".");
        // newEvent.type = type[type.length-1];
    }else{
        newEvent.location = [location];
        // var type = location.split(".");
        // newEvent.type = type[type.length-1];
    }
    
    newEvent.type = frmData.elements[4].value;
    newEvent.recipient = [frmData.elements[1].value];
    newEvent.subject = [frmData.elements[0].value];
    var day = frmData.elements[2].value-1;
    var time = frmData.elements[3].value.split(':');
    var simHours = time[0];
    var simMins = time[1];

    var ms = ((day * 24 * 60 * 60 * 1000) + (simHours * 60 * 60 * 1000) + (simMins * 60 * 1000))/simData.timeScale;
    var seconds = Math.floor((ms / 1000) % 60);
    var minutes = Math.floor((ms / 1000 / 60) % 60);
    var hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

    newEvent.time = [hours+":"+minutes+":"+seconds];
    
    console.log(newEvent);
    socket.emit('addEvent', newEvent);
    socket.emit('simState', "request", function (callbackData) {
        simData = callbackData.simData;
        timeline.destroy();
        items = [];
        groups = [];
        drawTimeline();
        timeline.redraw();
    });
    cancelEdit();
}

function updateEvent(){
    let frmData = document.getElementById("editEvent");
    let file = frmData.elements[5].files[0];
    if(file){
        uploadFiles(file, 'event');
        simData.eventsList[selected.id].location = ['/currentScenario/files/'+file.name];
        // var type = file.name.split(".");
        // simData.eventsList[selected.id].type = type[type.length-1];
    }
    
    simData.eventsList[selected.id].type = frmData.elements[4].value;
    simData.eventsList[selected.id].recipient = [frmData.elements[1].value];
    simData.eventsList[selected.id].subject = [frmData.elements[0].value];
    var day = frmData.elements[2].value-1;
    var time = frmData.elements[3].value.split(':');
    var simHours = time[0];
    var simMins = time[1];

    var ms = ((day * 24 * 60 * 60 * 1000) + (simHours * 60 * 60 * 1000) + (simMins * 60 * 1000))/simData.timeScale;
    var seconds = Math.floor((ms / 1000) % 60);
    var minutes = Math.floor((ms / 1000 / 60) % 60);
    var hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

    simData.eventsList[selected.id].time = [hours+":"+minutes+":"+seconds];
    
    console.log(simData.eventsList[selected.id]);
    socket.emit('updateEvent', simData.eventsList[selected.id]);
    socket.emit('simState', "request", function (callbackData) {
        simData = callbackData.simData;
        timeline.destroy();
        items = [];
        groups = [];
        drawTimeline();
        timeline.redraw();
    });
    cancelEdit();
}

function deleteEvent() {
    console.log(selected.id);
    socket.emit('deleteEvent', selected.id);
    socket.emit('simState', "request", function (callbackData) {
        simData = callbackData.simData;
        // console.log(simData);
        timeline.destroy();
        items = [];
        groups = [];
        drawTimeline();
        timeline.redraw();
    });
    cancelEdit();
}

function uploadFiles(file, request) {
    var xhr = new XMLHttpRequest();
    var formData = new FormData();
    xhr.open("POST", "/upload-"+request+"-file-live", true);
    xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');
    formData.append("upload", file);
    xhr.send(formData);
}

function useLibraryItem(libNum){
    addPopup(simData.library[libNum].subject, simData.library[libNum].location, simData.library[libNum].type);
}

function addPopup(subject, fileLocation, type){
    var libraryItems = '';
    for(var i=0; i<simData.library.length; i++){
        libraryItems += "<li>"+simData.library[i].subject+"\t<button onclick='useLibraryItem("+i+")'>Quick Add</button></li>"
    }

    var options = '';
    if (type === 'pdf'){
        options = "<option value='pdf' selected>pdf</option><option value='video'>video</option><option value='audio'>audio</option><option value='image'>image</option>";
    }else if (type === 'video'){
        options = "<option value='pdf'>pdf</option><option value='video' selected>video</option><option value='audio'>audio</option><option value='image'>image</option>";
    }else if (type === 'audio'){
        options = "<option value='pdf'>pdf</option><option value='video'>video</option><option value='audio' selected>audio</option><option value='image'>image</option>";
    }else if (type === 'image'){
        options = "<option value='pdf'>pdf</option><option value='video'>video</option><option value='audio'>audio</option><option value='image' selected>image</option>";
    }else {
        options = "<option value='pdf'>pdf</option><option value='video'>video</option><option value='audio'>audio</option><option value='image'>image</option>";
    }

    var ngoOptions = '';
    for(var i=0; i < simData.ngoList.length; i++){
        ngoOptions += "<option value='"+simData.ngoList[i].name+"'>"+simData.ngoList[i].name+"</option>";
    }
    var filename = ' - select new'
    if(!(fileLocation === undefined)){
        var loc = fileLocation[0].split("/");
        filename = ' - '+loc[loc.length-1];
    }
    if(subject === undefined){
        subject = '';
    }

    var days = Math.floor((simData.durationMs / (1000 * 60 * 60)));
    $("#modal").empty();
    $("#modal").append(
        "<div class='eventOverlayContent'>" +
        "<div id='overlayHeader'>" +
        "<button class='close' type='button' onclick=cancelEdit()><span>&times;</span></button>"+
        // "<span class='close'>&times;</span>" +
        "<form id='addEvent' enctype='multipart/form-data'></form>" +
        "<h3>Add Event</h3><br>" +
        "<div class='row'>"+
            "<div class='column1'>" +
                "<h4>Event Details:</h4><br>" +
                "<h5>Event Name</h5>" +
                "<input form='addEvent' id='overlayName' type='text' name='subject' value='"+subject+"'></input></td>" +
                "<h5>Recipient</h5>" +
                "<select form='addEvent' id='overlayRecipiants'>" +
                    "<option hidden disabled selected value> --select NGO-- </option>" +
                    ngoOptions +
                "</select>" +
                "<h5>Day</h5>" +
                "<input form='addEvent' id='overlayDay' type='number' name='day' min='1' max='"+days+"'></input>" +
                "<input form='addEvent' id='overlayTime' type='time' name='time'></input>" +
                "<h5>Type</h5>" +
                "<select form='addEvent' name='type'>" +
                    options +
                "</select><br>" +
                "<h5>Event Content<p>"+filename+"</p></h5>" +
                "<input form='addEvent' type='file' name='file' id='file' class='overlayinputfile' />" +
                "<label for='file'>File Selector</label><br>" +
                "<button form='addEvent' type='button' onclick=addEvent('"+fileLocation+"')>Submit</button>" +
            "</div>" +
            "<div class='column2'>" +
                "<h4>Library:</h4><br>" +
                "<ul class='libraryList'>" +
                    libraryItems +
                "</ul>" +
            "</div>" +
        "</div>");
    document.getElementById("modal").style.display = "block";
}

function setModal() {
    var ngoOptions = '';
    var selectedOption = '';
    for(var i=0; i < simData.ngoList.length; i++){
        if(selected.recipient === simData.ngoList[i].name[0]){
            selectedOption = 'selected';
        }else{
            selectedOption = '';
        }
        ngoOptions += "<option "+selectedOption+" value='"+simData.ngoList[i].name+"'>"+simData.ngoList[i].name+"</option>";
    }

    var options = '';
    if (selected.contentType === 'pdf'){
        options = "<option value='pdf' selected>pdf</option><option value='video'>video</option><option value='audio'>audio</option><option value='image'>image</option>";
    }else if (selected.contentType === 'video'){
        options = "<option value='pdf'>pdf</option><option value='video' selected>video</option><option value='audio'>audio</option><option value='image'>image</option>";
    }else if (selected.contentType === 'audio'){
        options = "<option value='pdf'>pdf</option><option value='video'>video</option><option value='audio' selected>audio</option><option value='image'>image</option>";
    }else if (selected.contentType === 'image'){
        options = "<option value='pdf'>pdf</option><option value='video'>video</option><option value='audio'>audio</option><option value='image' selected>image</option>";
    }

    var t = selected.time.split(':');
    var h = parseInt(t[0], 10);
    var m = parseInt(t[1], 10);
    var s = parseInt(t[2], 10);
    var ms = ((h * 60 * 60 * 1000) + (m * 60 * 1000) + (s * 1000))*24;
    var seconds = Math.floor((ms / 1000) % 60);
    var minutes = Math.floor((ms / 1000 / 60) % 60);
    var hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    var days = Math.floor((ms / (1000 * 60 * 60)) / 24);
    console.log(days+", "+hours+':'+minutes);

    var maxDays = Math.floor((simData.durationMs / (1000 * 60 * 60)));

    $("#modal").empty();
    $("#modal").append(
        "<div class='eventOverlayContent'>" +
        "<div id='overlayHeader'>" +
        "<button class='close' type='button' onclick=cancelEdit()><span>&times;</span></button>"+
        // "<span class='close'>&times;</span>" +
        
        "<table border-collapse= 'collapse' width= '100%'>" +
            "<tr>" +
              "<th>Event Name</th>" +
              "<th>Recipient</th>" +
              "<th>Day</th>" +
              "<th>Type</th>" +
              "<th>Event Content</th>" +
            "</tr>" +
            "<form id='editEvent' enctype='multipart/form-data'></form>" +
            "<tr>" +
                "<td><input form='editEvent' id='overlayName' type='text' name='subject' value='"+selected.content+"'></input></td>" +
                "<td>" +
                    "<select form='editEvent' id='overlayRecipiants'>" +
                        ngoOptions +
                    "</select>" +
                "</td>" +
                "<td>" +
                    "<input form='editEvent' id='overlayDay' type='number' name='day' value='"+(days+1)+"' min='1' max='"+maxDays+"'></input>" +
                    "<input form='editEvent' id='overlayTime' type='time' name='time' value='"+pad(hours, 2)+":"+pad(minutes, 2)+"'></input>" +
                "</td>" +
                "<td>" +
                    "<select form='editEvent' name='type'>" +
                        options +
                    "</select><br>" +
                "</td>" +
                "<td>" +
                    "<input form='editEvent' type='file' name='file' id='file' class='overlayinputfile' />" +
                    "<label for='file' >File Selector</label>" +
                "</td>" +
                "<td>" +
                    "<button form='editEvent' type='button' onclick=updateEvent()>Update</button>" +
                "</td>" +
                "<td>" +
                "<button type='button' style='background-color:red; color:white;' onclick=deleteEvent()>Delete</button>" +
                "</td>" +
            "</tr>" +
          "</table>" +
          "<div id='eventMediaDisplay'></div>"+
          "</div></div>");
}

function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

//Once Page Loaded
$(function () {

    processScenarioData();
    updateCurrentTime();
    handleTimeSwitcher();
    switchNGOChat();
    handleNewMessages();

    //Handle Messages

    $("#hqSendToNGO").click(function(e) {
        e.preventDefault(); // prevents page reloading
        if(selectedNGOChat != null) {
            submitMessage(false, $('#input').val());
        }
        $('#input').val('');
    });

    $("#hqSendToAll").click(function(e) {
        e.preventDefault(); // prevents page reloading
        submitMessage(true, $('#input').val());
        $('#input').val('');
    });

    //New Event Response Form
    $('#inboxHQForm').submit(function (e) {
        e.preventDefault(); // prevents page reloading
        let content = $('#inputEmailResponseHQ').val();
        if(content.length <= 0){
            return;
        }
        e.preventDefault(); // prevents page reloading
        //Function takes array by default so add turn single message into array
        var responseAsArray = [];
        responseAsArray.push(content);
        addMessageToEventResponse(responseAsArray, true);
        console.log(selectedEvent);
        var response = {
            from: 'HQ',
            event: selectedEvent,
            content: content,
            chosenNGOTag: "None (From HQ)"
        }

        $('#inputEmailResponseHQ').val('');
        socket.emit('newEventResponse', {response});

    });

});


