const socket = io();
var simTitle;
var ngos = [];
var started;
var events = [];
var rowCount = 0;
var selectedNGOChat;
var ngoNames;


//Load Page Elements
//loadCommunication();
loadScenarioHeader();
//testing:
getTempPDF();
//getNGONames();



//handleNGOS();

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

//New NGOS
socket.on('ngoList', function (data) {
    console.log("new ngo");
    ngos = data.ngoUsers;
    handleNGOS();
});

/*function getNGONames() {*/

    socket.on('currentNGONames', function (data) {
        console.log("got names");
        ngoNames = data.ngoNames;


    });

/*}*/


function handleNGOS() {
    //Find ngo button and reveal it
    if (ngos != null) {
        let currentNGOName = ngos[ngos.length - 1].name;

        console.log("id: " + ngos[ngos.length - 1].id);

        document.getElementById(ngos[ngos.length - 1].id).style.visibility = "visible";
    }
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


//Once Page Loaded
$(function () {
    //Update Communication Buttons
    fillCommunicationButtons();
    //Load PDF
    PDFObject.embed("/files/test.pdf", "#emailViewer");
    //Needed to auto hide placeholder messaging content
    switchNGOChat();
    $('#messageHQ').submit(function (e) {
        e.preventDefault(); // prevents page reloading
        // Add send message to ngo conversation

        addToConversation($('#input').val(), true, null);

        //Find actual Name of NGO
        let name = document.getElementById(selectedNGOChat).innerHTML;

        console.log("actualname" + name);

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

    var buttons = document.getElementsByClassName("btn btn-secondary");
    console.log("buttonL: " + buttons.length);
    console.log("ngonamesL: " + ngoNames.length);
    for (i = 0; i < buttons.length; i++) {
        buttons[i].innerHTML = ngoNames[i];
    }

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

