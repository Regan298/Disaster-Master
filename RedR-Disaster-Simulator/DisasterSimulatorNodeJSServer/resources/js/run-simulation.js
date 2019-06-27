const socket = io();
var simTitle;
var ngos = [];
var started;
var events = [];
var rowCount = 0;
var selectedNGOChat;


//Load Page Elements
//loadCommunication();
loadScenarioHeader();
//testing:
getTempPDF();

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

function handleNGOS() {
    //Change placeholder button text to be actual ngo name and set this button to visible
    if (ngos != null) {
        let currentNGOName = ngos[ngos.length - 1].name;
        document.getElementById("ngo" + ngos.length).innerHTML = currentNGOName;
        document.getElementById("ngo"+ngos.length).style.visibility = "visible";
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
        messagingContent[i].style.visibility = "hidden";
    }



    // Show the specific message content
    if (ngo != null) {
        console.log("ngoselected: " + ngo);
        document.getElementById(ngo+"Content").style.visibility = "visible";
    }
}


//Once Page Loaded
$(function () {
    //Load PDF
    PDFObject.embed("/files/test.pdf", "#emailViewer");
    //Needed to auto hide placeholder messaging content
    switchNGOChat();
    $('#messageHQ').submit(function (e) {
        e.preventDefault(); // prevents page reloading
        // Add send message to ngo conversation
        console.log(selectedNGOChat);
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
        if(from != "HQ"){
            addToConversation(msg.recievedMessage.content, false, from);
        }

    });

});

function addToConversation(content, isOrigin, from) {

    console.log("to" + from);

    if(isOrigin) {
        $("#" + selectedNGOChat + "Content").append("<li id='origin'>" + content + "</li>");
    } else {

        var ngoId;





        for(i = 0; i < ngos.length; i++){
            if(ngos[i].name == from){
                ngoId = ngos[i].id;
            }
        }

        console.log(ngoId);

        $("#" + "ngo" + ngoId + "Content").append("<li id='nonOrigin'>" + content + "</li>");
    }
}

function loadEvents() {


    var table = document.getElementById("outboxTable");
    //adds cells as well as the titles of cells into the cells
    while (table.hasChildNodes()) {
        table.removeChild(table.firstChild);
    }


    for (var i = 0; i < events.length; i++) {
        var row = table.insertRow(i);
        var cell1 = row.insertCell(0);
        cell1.innerHTML = "HQ" + " " + "Subject" + " " + events[i].Time;
        table.rows[i].cells[0].onclick = function () {
            rIndex = this.parentElement.rowIndex;
            cIndex = this.cellIndex;
            //console.log("Row : "+rIndex+" , Cell : "+cIndex);
            var cellValue = (table.rows[rIndex].cells[cIndex].innerHTML);
            getPDF(i);
        };
    }

    //rowCount++;
    //$(htmlContent).appendTo(".events");
}

function getPDF(cellValue) {
    console.log(cellValue);
    PDFObject.embed(events[cellValue - 1].Location, "#outboxPdf");/*change my-container to pdf*/
}

function getTempPDF(){

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

