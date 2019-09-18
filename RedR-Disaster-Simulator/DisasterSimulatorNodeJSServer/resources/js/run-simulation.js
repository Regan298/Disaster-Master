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

//todo: Unccomment this when done
window.onbeforeunload = function() {
    //return "Generic Message (Browsers Prevent Custom Message For Security Purposes)";
};


function handleNGOJoining() {
    //New NGOS
    socket.emit('getConnected', "request", function (callbackData) {
        processNGOData(callbackData.connectedUsers);
        for (var i = 0; i < ngos.length; i++) {
            let currentUserName = new String(ngos[i].name).trim().replace(" ", "_");
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
        ngos[i].name = new String(ngos[i].name).trim().replace(" ", "_");
    }
}

function handlePersistentMessages() {
    socket.emit('getPastMessages', "request", function (callbackData) {
        if (callbackData.pastMessages != null) {

            for (var i = 0; i < callbackData.pastMessages.length; i++) {
                let currentPastMessage = callbackData.pastMessages[i];
                var isOrigin;
                if (currentPastMessage.sender.replace(" ", "_") === "HQ") {
                    isOrigin = true;
                } else {
                    isOrigin = false;
                }
                addToConversation(currentPastMessage.content, isOrigin, currentPastMessage.sender.replace(" ", "_"), currentPastMessage.recipient.replace(" ", "_"));

            }
        }


    });

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
    $(htmlContent).appendTo(".scenarioTitle");


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
                items.push({
                    id: currentEvent.id,
                    group: id,
                    content: currentEvent.subject[0],
                    location: currentEvent.location[0],
                    start: '2019-01-' + scaledTime.getDate() + ' ' + scaledTime.getHours() + ':' + scaledTime.getMinutes() + ':' + scaledTime.getSeconds(),
                    contentType: currentEvent.type,
                    recipient: currentEvent.recipient[0]
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
        let currentUserName = new String(simData.ngoList[i].name).trim().replace(" ", "_");

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
        messagingChats[i].id = new String(simData.ngoList[i].name).trim().replace(" ", "_") + "Content";
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
        to = to.trim().replace(" ", "_") + "Content";
        var childUl = $("#" + to).find('.messageList');
        $(childUl).append("<li id='origin'>" + content + "</li>");
    } else {

        if (to !== "HQ") {
            return;
        }

        var value;
        for (var i = 0; i < ngos.length; i++) {
            if (ngos[i].name === from) {
                value = from.replace(" ", "_") + "Content";
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

function displayEventMedia(type, name) {
    console.log(type);
    document.getElementById("pdfOverlay").style.display = "none";
    document.getElementById("audioOverlay").style.display = "none";
    document.getElementById("imageOverlay").style.display = "none";
    document.getElementById("videoOverlay").style.display = "none";
    if (type == "mp4") {
        document.getElementById("videoOverlay").style.display = "block";
    } else if (type == "pdf") {
        console.log(name);
        PDFObject.embed(name, "#pdfOverlay");
        document.getElementById("pdfOverlay").style.display = "block";
    } else if (type == "mp3") {
        document.getElementById("audioOverlay").style.display = "block";
    } else if (type == "jpg") {
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

//
function imageOverlayOff() {
    document.getElementById("imageOverlay").style.display = "none";
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

function updateEvent(){
    let frmData = document.getElementById("editEvent");
    let file = frmData.elements[4].files[0];
    if(file){
        uploadFiles(file, 'event');
        simData.eventsList[selected.id].location = ['/currentScenario/files/'+file.name];
        var type = file.name.split(".");
        simData.eventsList[selected.id].type = type[type.length-1];
    }
    
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
                    "<input form='editEvent' id='overlayDay' type='number' name='day' value='3' min='1' max='5'></input>" +
                    "<input form='editEvent' id='overlayTime' type='time' name='time' value='12:44'></input>" +
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
            content: content
        }

        $('#inputEmailResponseHQ').val('');
        socket.emit('newEventResponse', {response});

    });

});


