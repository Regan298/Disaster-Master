const socket = io();
var name;
var ngos = [];
var inboxEvents = [];
var simulationDuration = 0;
var ngoNames;
var selectedNGOChat;
var nameNotRecieved = true;
var simData;
var ngoNameToID = new Map();

handleNewNGOJoining();


//Runs in Background and gets new users
function handleNewNGOJoining() {
    //New NGO joining
    socket.on('ngoList', function (data) {
        var ngoTemp = data.connectedUsers;
        let currentUserName = new String(ngoTemp[ngoTemp.length - 1].name).trim();


        if (currentUserName === name) {
            return;
        }
        //data.connectedUsers[data.connectedUsers.length-1].name.trim() === name;


        processNGOData(data.connectedUsers, function () {
            if (ngos[ngos.length - 1].name !== "HQ") {
                console.log("newngo");
                console.log(ngos[ngos.length - 1].id);
                var ngoNum = parseInt(ngos[ngos.length - 1].id.substr(3, 1)) - 1 ;
                console.log("ngo" + ngoNum);
                document.getElementById("ngo" + ngoNum).style.visibility = "visible";
            }

        });

    });
}

// Gets prior connected users
function getCurrentConnectedNGOs() {
    socket.emit('getConnected', "request", function (callbackData) {
        console.log(callbackData);
        processNGOData(callbackData.connectedUsers);
        processConnectedUsers();
    });

}


//Processes prior connected users
function processConnectedUsers() {
    console.log("connectedprocess");
    console.log(ngos.length);

    for (var i = 0; i < ngos.length; i++) {
        console.log(ngos[i].name);
    }

    for (var i = 0; i < ngos.length; i++) {
        let currentUserName = new String(ngos[i].name).trim();
        console.log("currentuser" + currentUserName);
        if (currentUserName !== "HQ") {
            console.log("not me and not hq");
            var ngoNum = parseInt(ngos[ngos.length - 1].id.substr(3, 1)) - 1;
            document.getElementById("ngo" + ngoNum).style.visibility = "visible";
        }
    }
}

//Sets ngos after removing this as a user
function processNGOData(recievedNGOs, callback) {
    console.log("processngo");
    ngos = [];
    for (var i = 0; i < recievedNGOs.length; i++) {
        let currentUserName = new String(recievedNGOs[i].name).trim();
        if (currentUserName !== name) {
            ngos.push(recievedNGOs[i]);
        }
    }


    if (callback != null) {
        callback();
    }
}


function fillCommunicationButtons() {
    var buttons = document.getElementsByClassName("btn btn-secondary");
    buttons[0].innerHTML = "HQ";
    var ngosTemp = simData.ngoList;
    for (var i = 0; i < ngosTemp.length; i++) {
        let currentUserName = new String(ngosTemp[i].name).trim();
        if (currentUserName === name) {
            ngosTemp.splice(i, 1);
        }
    }

    for (var i = 0; i < ngosTemp.length; i++) {
        console.log(ngosTemp[i].name);
    }

    for (var i = 1; i <= ngosTemp.length; i++) {
        let currentUserName = new String(ngosTemp[i - 1].name).trim();
        buttons[i].innerHTML = currentUserName;
    }

    for (var i = 0; i < ngosTemp.length; i++) {
        ngoNameToID.set(i, )
    }
}


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


function displayRemainingTime(timerElement, timeRemaining) {

    var seconds = Math.floor((timeRemaining / 1000) % 60);
    var minutes = Math.floor((timeRemaining / 1000 / 60) % 60);
    var hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);


    timerElement.innerHTML = hours + "h" + minutes + "m" + seconds + "s";

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
        console.log("ngoselected: " + ngo);
        document.getElementById(ngo + "Content").style.display = "inline-block";
    }
}


function addToConversation(content, isOrigin, from) {

    console.log("from" + from);


    if (from == "HQ") {
        from = "HQ";
    }

    if (isOrigin) {
        $("#" + selectedNGOChat + "Content").append("<li id='origin'>" + content + "</li>");
    } else {

        var ngoId;


        for (i = 0; i < users.length; i++) {
            console.log("users: " + users[i].name);
            if (users[i].name == from) {
                if (from == "HQ") {
                    ngoId = "ngo0"
                } else {
                    ngoId = users[i].id;
                }
            }
        }

        console.log(ngoId);

        $("#" + ngoId + "Content").append("<li id='nonOrigin'>" + content + "</li>");
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
        fillCommunicationButtons();
        getCurrentConnectedNGOs();
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

//On Page Load
$(function () {
    processScenarioData();
    switchNGOChat();

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

    //on receive message
    socket.on('message', function (msg) {
        console.log("messagerecieved");

        var from = msg.recievedMessage.from;
        var to = msg.recievedMessage.to;

        addToConversation(msg.recievedMessage.content, false, from);


    });

    //TODO: load completed events


    //on receive event
    socket.on('event', function (evnt) {
        //console.log('got events');
        inboxEvents = [];
        for (var i = 0; i < evnt.msg.length; i++) {
            var to = evnt.msg[i].Recipient;
            if (to === name) {
                //$('#eventList').append($('<li>').text(evnt.recievedEvent.contentLocation));
                inboxEvents.push(evnt.msg[i]);

                //loadOutboxEvents();
            }
        }
        //console.log(inboxEvents);
        //loadInboxEvents(inboxEvents);

    });

    socket.on('currentTime', function (time) {
        simulationDuration = time;
        var timerElement = document.getElementById("timeManagement");
        displayRemainingTime(timerElement, simulationDuration);
    });

});
