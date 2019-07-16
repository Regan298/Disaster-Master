const socket = io();
var name;
var users = [];
var inboxEvents = [];
var outboxEvents = [];
var inboxRowCount = 0;
var outboxRowCount = 0;
var simulationDuration = 50000;
var ngoNames;
var selectedNGOChat;


loadNGOTitle();
//loadCommunication();
handleNGOS();
runClock();

currentTime = 0;


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

function fillCommunicationButtons() {
    var buttons = document.getElementsByClassName("btn btn-secondary");
    buttons[0].innerHTML = "HQ";


    socket.on('currentNGONames', function (data) {
        console.log("got names");
        ngoNames = data.ngoNames;
        console.log("buttonL: " + buttons.length);
        console.log("ngonamesL: " + ngoNames.length);
        for (i = 1; i < buttons.length; i++) {
            buttons[i].innerHTML = ngoNames[i];
        }
    });
}


function handleNGOS() {

    socket.on('users', function (data) {

        users = data.ngoUsers;
        console.log(users.length);



        if (users != null) {
            let currentNGOName = users[users.length - 1].name;

            console.log("id: " + users[users.length - 1].id);
            console.log("ngoname: " + currentNGOName);
            console.log("name: " + name);

            if(currentNGOName != name) {
                document.getElementById(users[users.length - 1].id).style.visibility = "visible";
            }
        }

    });


}

function displayPDF(){
    document.getElementById("eventOverlay").style.display = "block";
}

function displayPDFOff() {
    document.getElementById("eventOverlay").style.display = "none";
}


//Handle Messaging and Events
$(function () {
    switchNGOChat();
    fillCommunicationButtons();

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
        console.log(msg.recievedMessage.content);
        var from = msg.recievedMessage.from;
        var to = msg.recievedMessage.to;

        $('#' + to).append($('<li>').text(msg.recievedMessage.content));
        $('#' + from).append($('<li>').text(msg.recievedMessage.content));

        $('<style>' +
            "#" + to + " li:nth-child(odd){ " +
            "    text-align: center;\n" +
            "    color: red;\n" +
            "    font-weight: bold;\n" +
            "}"

            + '</style>').appendTo(document.head);


        /*if(from === name) {
            //message came from self
           console.log('#' + to);
           $('#' + to).append($('<li>').text(msg.recievedMessage.content));
        }
        if(to === name){
            $('#' + from).append($('<li>').text(msg.recievedMessage.content));

            $('<style>'+
                "#" + from + "li:nth-child(odd) { font-size: 30px;\n" +
                "    display: inline;\n" +
                "    text-align: center;\n" +
                "    color: red;\n" +
                "    font-weight: bold;\n" +
                "}"

                +'</style>').appendTo(document.head);
        }*/

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


function loadNGOTitle() {
    //Ask Server For Name

    socket.on('nameRequest', function (data) {
        name = data;
        var htmlContent = "<h1 class='titles'><span>NGO: " + name + "</span></h1>";
        $(htmlContent).appendTo(".ngoTitle");
    });


}

/*function loadInboxEvents(inboxEvents) {

    /!*var htmlContent = "<h1>Events</h1>\n" +
        "<ul id=\"eventList\">\n" +
        "\n" +
    "</ul>\n";*!/
    var table = document.getElementById("inboxTable");
    //adds cells as well as the titles of cells into the cells
    //console.log(inboxEvents[inboxRowCount]);
    //console.log(inboxRowCount);

    while (table.hasChildNodes()) {
        table.removeChild(table.firstChild);
    }


    for (var i = 0; i < inboxEvents.length; i++) {
        var row = table.insertRow(i);
        var cell1 = row.insertCell(0);
        cell1.innerHTML = "HQ" + " " + "Subject" + " " + inboxEvents[i].Time;
        table.rows[i].cells[0].onclick = function () {
            rIndex = this.parentElement.rowIndex;
            cIndex = this.cellIndex;
            //console.log("Row : "+rIndex+" , Cell : "+cIndex);
            var cellValue = (table.rows[rIndex].cells[cIndex].innerHTML);
            getInboxPDF(i);
        };
    }


    //inboxRowCount++;
    //$(htmlContent).appendTo(".events");
}*/

function loadOutboxEvents() {

    /*var htmlContent = "<h1>Events</h1>\n" +
        "<ul id=\"eventList\">\n" +
        "\n" +
    "</ul>\n";*/
    var table = document.getElementById("outboxTable");
    //adds cells as well as the titles of cells into the cells
    while (table.hasChildNodes()) {
        table.removeChild(table.firstChild);
    }


    for (var i = 0; i < outboxEvents.length; i++) {
        var row = table.insertRow(i);
        var cell1 = row.insertCell(0);
        cell1.innerHTML = "HQ" + " " + "Subject" + " " + outboxEvents[i].Time;
        table.rows[i].cells[0].onclick = function () {
            rIndex = this.parentElement.rowIndex;
            cIndex = this.cellIndex;
            //console.log("Row : "+rIndex+" , Cell : "+cIndex);
            var cellValue = (table.rows[rIndex].cells[cIndex].innerHTML);
            getOutboxPDF(i);
        };
    }


    //outboxRowCount++;
    //$(htmlContent).appendTo(".events");
}

function getInboxPDF(cellValue) {
    console.log(cellValue);
    PDFObject.embed(inboxEvents[cellValue - 1].Location, "#inboxPdf");/*change my-container to pdf*/
}

function getOutboxPDF(cellValue) {
    console.log(cellValue);
    PDFObject.embed(outboxEvents[cellValue - 1].Location, "#outboxPdf");/*change my-container to pdf*/
}


function loadCommunication() {

    var htmlContent = "<h1>Communication</h1><br>\n" +
        "\n" +
        "<ul id=\"ngoList\">\n" +
        "\n" +
        "</ul>\n" +
        "<label for=\"ngoRecipient\"> Recipient:  </label>\n" +
        "<select form = \"messageNGO\" id=\"ngoRecipient\">\n" +
        "\n" +
        "</select>\n" +
        "\n" +
        "<br>\n" +
        "Message:<br>\n" +
        "<form action=\"\" id=\"messageNGO\">\n" +
        "\t<textarea style=\"resize:none;height:400px;width:800px\" maxlength=\"10000\" form=\"messageNGO\" id=\"input\"></textarea>\n" +
        "\t<input type=\"submit\" value=\"Send\" class=\"button\"/>\n" +
        "</form>";


    $(htmlContent).appendTo(".messaging");
}