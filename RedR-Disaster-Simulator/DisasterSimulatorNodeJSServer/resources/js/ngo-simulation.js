const socket = io();
var name;
var ngos = [];
var inboxEvents = [];
var simulationDuration = 0;
var selectedNGOChat;
var nameNotRecieved = true;
var simData;

//Runs in Background and gets new and past users on a period
function handleNGOJoining() {
    socket.emit('getConnected', "request", function (callbackData) {
        processNGOData(callbackData.connectedUsers);
        for (var i = 0; i < ngos.length; i++) {
            let currentUserName = new String(ngos[i].name).trim();
            if (currentUserName !== "HQ") {

                document.getElementById(currentUserName).style.visibility = "visible";
            }
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
        }
    }
}


//handle the communication button value and ids to be ngo name and id
function handleCommunicationButtonsAndMessages() {
    var buttons = document.getElementsByClassName("btn btn-secondary");
    var messagingChats = document.getElementsByClassName("messagingContent");
    buttons[0].innerHTML = "HQ";
    var ngosTemp = [];
    for (var i = 0; i < simData.ngoList.length; i++) {
        let currentUserName = new String(simData.ngoList[i].name).trim();
        if (currentUserName !== name) {
            ngosTemp.push(simData.ngoList[i]);
        }
    }


    for (var i = 1; i <= ngosTemp.length; i++) {
        let currentUserName = new String(ngosTemp[i - 1].name).trim();
        buttons[i].innerHTML = currentUserName;
        buttons[i].id = currentUserName;
        buttons[i].setAttribute("onclick", "switchNGOChat('" +  currentUserName + "')")

        //buttons[i] = "switchNGOChat('" + currentUserName + "')";
        buttons[i].style.visibility = "hidden";
    }


    for (var i = 1; i <= ngosTemp.length; i++) {
        messagingChats[i].id = new String(ngosTemp[i-1].name).trim()+"Content";
    }

    //remove extra buttons
    console.log(ngosTemp.length);

    var buttonsCount = buttons.length;

    for (var j = ngosTemp.length; j < buttonsCount-1; j++) {
        buttons[ngosTemp.length+1].remove();
        messagingChats[ngosTemp.length+1].remove();
    }



}


function displayRemainingTime(timerElement, timeRemaining){
    var seconds = Math.floor((timeRemaining / 1000) % 60);
    var minutes = Math.floor((timeRemaining / 1000 / 60) % 60);
    var hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
    timerElement.innerHTML = hours + "h" + minutes + "m" + seconds + "s";

}

//Switch the chat recipient based on what chat is selctected
function switchNGOChat(ngo) {
    console.log("switch");
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
        console.log("ngoselected: " + ngo);
        var value;
        if (ngo == "HQ"){
            value = "ngo0Content";
        } else {
            value = ngo+"Content";
        }
        document.getElementById(value).style.display = "inline-block";
    }
}

function addToConversation(content, isOrigin, from) {
    console.log(content);
    console.log(isOrigin);
    console.log(from);

    if (isOrigin) {
        $("#" + selectedNGOChat + "Content").append("<li id='origin'>" + content + "</li>");
    } else {
        var ngoId;
        for (i = 0; i < ngos.length; i++) {
            var value;
            if (ngos[i].name == from) {
                if (from == "HQ") {
                    value = "ngo0Content"

                } else {
                    value = from+"Content";
                }
            }
        }
        console.log(value);
        $("#" + value).append("<li id='nonOrigin'>" + content + "</li>");
    }
}


function loadNGOTitle() {
    socket.emit('nameRequest', "request", function (callbackData) {
        name = callbackData;
        console.log(name);
        var htmlContent = "<h1 class='titles'><span>NGO: " + name + "</span></h1>";
        $(htmlContent).appendTo(".ngoTitle");
        nameNotRecieved = false;
    });
}


function processScenarioData() {
    socket.emit('simState', "request", function (callbackData) {
        simData = callbackData.simData;
        loadNGOTitle();
        handleCommunicationButtonsAndMessages();
        setInterval(handleNGOJoining,1000);
    });
}


function displayPDFOff() {
    document.getElementById("pdfOverlay").style.display = "none";
}

function displayEvent(type) {
    document.getElementById("pdfOverlay").style.display = "none";
    document.getElementById("audioOverlay").style.display = "none";
    document.getElementById("imageOverlay").style.display = "none";
    document.getElementById("videoOverlay").style.display = "none";

    if (type == "mp4") {
        document.getElementById("videoOverlay").style.display = "block";
    } else if (type == "pdf") {
        PDFObject.embed("/files/test.pdf", "#pdfOverlay");
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
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
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

function recieveEvents(){
    //on receive event
    socket.on('event', function (evnt) {

        inboxEvents = [];
        for (var i = 0; i < evnt.msg.length; i++) {
            var to = evnt.msg[i].Recipient;
            if (to === name) {
                inboxEvents.push(evnt.msg[i]);
            }
        }
    });
}

function recieveCurrentTime() {
    socket.on('currentTime', function (time) {
        simulationDuration = time;
        var timerElement = document.getElementById("timeManagement");
        displayRemainingTime(timerElement, simulationDuration);
    });
}

function displayDisclaimer(){
    //alert("The purpose of this tool is for training please keep this in mind throughout this simulation");
}

function handleMessageRecieving() {
    //on receive message
    socket.on('message', function (msg) {
        console.log("recieved")
        var from = msg.recievedMessage.from;
        var to = msg.recievedMessage.to;
        addToConversation(msg.recievedMessage.content, false, from)
    });

}

//On Page Load
$(function () {
    displayDisclaimer();
    processScenarioData();
    switchNGOChat();
    recieveEvents();
    recieveCurrentTime();
    handleMessageRecieving();


    //New message form
    $('#messageNGO').submit(function (e) {
        console.log("TEST");
        e.preventDefault(); // prevents page reloading
        console.log("submitmessage");
        addToConversation($('#input').val(), true, null);
        let recipient = document.getElementById(selectedNGOChat).innerHTML;


        var message = {
            from: name,
            to: recipient,
            content: $('#input').val()
        }

        $('#input').val('');
        socket.emit('message', {message});

    });



});
