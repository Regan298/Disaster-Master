const socket = io();
var name;
var users = [];
var inboxEvents = [];
var outboxEvents = [];
var inboxRowCount = 0;
var outboxRowCount = 0;


loadNGOTitle();
//loadCommunication();
handleNGOS();



//Handle Messaging and Events
$(function () {

    //New message form
    $('#messageNGO').submit(function (e) {
        console.log("TEST");
        e.preventDefault(); // prevents page reloading
        console.log("submitmessage");


        console.log($('#ngoRecipient').val());

        var message = {
            from: name,
            to: $('#ngoRecipient').val(),
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
        if(from === name) {
            //message came from self
           console.log('#' + to);
           $('#' + to).append($('<li>').text(msg.recievedMessage.content));
        }
        if(to === name){
            $('#' + from).append($('<li>').text(msg.recievedMessage.content));
        }

    });

	//TODO: load completed events
	

    //on receive event
	socket.on('event', function (evnt) {
		console.log('got events');
		inboxEvents = [];
		for(var i = 0; i<evnt.msg.length; i++){
			var to = evnt.msg[i].Recipient;
			if(to === name){
				//$('#eventList').append($('<li>').text(evnt.recievedEvent.contentLocation));
				inboxEvents.push(evnt.msg[i]);
				
				//loadOutboxEvents();
			}
		}
		console.log(inboxEvents);
		loadInboxEvents(inboxEvents);
        
    });
});

function handleNGOS(){
    socket.on('users', function (data) {

        users = data.ngoUsers;


        for(var i = 0; i < users.length; i++) {
            var currentName = users[i].name;
            // if name not itself and ngo element does not exist
            console.log("ngoname" + name);
            if(currentName !== name && ($('#'+currentName).length == 0)) {
                console.log(currentName);
                $('#ngoList').append("<ul id='" + users[i].name + "'>" + "NGO: " + users[i].name + "</ul>");

                $('#ngoRecipient').append($('<option>', {
                    value: users[i].name,
                    text: users[i].name

                }));
            }
        }

    });


}



function loadNGOTitle() {

    socket.on('ngoName', function (data) {
        name = data;
        var htmlContent = "<h1>NGO: " + name + "</h1>";

        $(htmlContent).appendTo(".ngoTitle");
    });



}

function loadInboxEvents(inboxEvents){
	
	/*var htmlContent = "<h1>Events</h1>\n" +
        "<ul id=\"eventList\">\n" +
        "\n" +
	"</ul>\n";*/
	var table = document.getElementById("inboxTable");
	//adds cells as well as the titles of cells into the cells
	//console.log(inboxEvents[inboxRowCount]);
	//console.log(inboxRowCount);
	
	while(table.hasChildNodes()){
		table.removeChild(table.firstChild);
	}
	
	
	for(var i = 0; i<inboxEvents.length; i++){
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
}

function loadOutboxEvents(){
	
	/*var htmlContent = "<h1>Events</h1>\n" +
        "<ul id=\"eventList\">\n" +
        "\n" +
	"</ul>\n";*/
	var table = document.getElementById("outboxTable");
	//adds cells as well as the titles of cells into the cells
	while(table.hasChildNodes()){
		table.removeChild(table.firstChild);
	}
	
	
	for(var i = 0; i<outboxEvents.length; i++){
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

function getInboxPDF(cellValue){
	console.log(cellValue);
    PDFObject.embed(inboxEvents.msg[cellValue-1].Location, "#inboxPdf");/*change my-container to pdf*/
}

function getOutboxPDF(cellValue){
	console.log(cellValue);
    PDFObject.embed(outboxEvents[cellValue-1].Location, "#outboxPdf");/*change my-container to pdf*/
}


function loadCommunication(){

    var htmlContent = "<h1>Communication</h1>\n" +
        "<ul id=\"ngoList\">\n" +
        "\n" +
        "</ul>\n" +
        "<label for=\"ngoRecipient\"> Recipient:  </label>\n" +
        "<select form = \"messageNGO\" id=\"ngoRecipient\">\n" +
        "\n" +
        "</select>\n" +
        "\n" +
        "<form id=\"messageNGO\" action=\"\">\n" +
        "    <input type=\"text\" id=\"input\"/>\n" +
        "    <input type=\"submit\" value=\"Send\" class=\"button\"/>\n" +
        "</form>";


    $(htmlContent).appendTo(".communication");
}