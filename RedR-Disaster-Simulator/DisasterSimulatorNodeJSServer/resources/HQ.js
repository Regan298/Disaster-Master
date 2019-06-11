const socket = io();
var simTitle;
var ngos = [];
var started;
var events = [];
var rowCount = 0;


//Load Page Elements
//loadCommunication();
loadScenarioHeader();


//New NGOS
socket.on('ngoList', function (data) {
    console.log("new ngo");
    ngos = data.ngoUsers;

    handleNGOS();
});

//Handle Messaging and Events
$(function () {
    $('#messageHQ').submit(function (e) {
        e.preventDefault(); // prevents page reloading
        console.log("submitmessage");


        console.log($('#ngoRecipient').val());

        var message = {
            from: 'HQ',
            to: $('#ngoRecipient').val(),
            content: $('#input').val()
         }

        $('#input').val('');
        socket.emit('message', {message});

    });

    socket.on('message', function (msg) {
        console.log(msg.recievedMessage.content);
        var from = msg.recievedMessage.from;
        var to = msg.recievedMessage.to;
        if(from === 'HQ') {
            console.log('#' + to);
            $('#' + to).append($('<li>').text(msg.recievedMessage.content));
        }
        if(to === 'HQ'){
            $('#' + from).append($('<li>').text(msg.recievedMessage.content));
        }

    });

	//on receive event
	socket.on('event', function (evnt) {
		console.log('got events');
		events = [];
		for(var i = 0; i<evnt.msg.length; i++){
			//$('#eventList').append($('<li>').text(evnt.recievedEvent.contentLocation));
			console.log('copy event');
			
			events.push(evnt.msg[i]);
			
			//loadOutboxEvents();
		}
		console.log(events);
		loadEvents(events);

    });

});

function handleNGOS() {

    if(ngos != null) {
        console.log("TEST");

            $('#ngoRecipient').append($('<option>', {
                value: ngos[ngos.length-1].name,
                text: ngos[ngos.length-1].name

            }));



        $('#ngoList').append("<ul id='" + ngos[ngos.length-1].name +"'>" + "NGO: " + ngos[ngos.length-1].name + "</ul>");
    }
}

//redraw()
//getSelection()


function loadScenarioHeader(){

        socket.on('simState', function (data) {
            if(!started) {
                console.log("HERE");
                started = true;
                simTitle = data.simData.title;
                var url = document.URL.split('/');
                url = url[2] + "/ngo";

                var htmlContent = "<h1>Scenario: " + simTitle + "</h1>" +
                    "<h2> Please inform your NGO's to go to this page: " + url + "</h2>";

                $(htmlContent).appendTo(".header");

            }
        });
}

function loadEvents(){
	
	/*var htmlContent = "<h1>Events</h1>\n" +
        "<ul id=\"eventList\">\n" +
        "\n" +
	"</ul>\n";*/
	var table = document.getElementById("outboxTable");
	//adds cells as well as the titles of cells into the cells
	while(table.hasChildNodes()){
		table.removeChild(table.firstChild);
	}
	
	
	for(var i = 0; i<events.length; i++){
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

function getPDF(cellValue){
	console.log(cellValue);
    PDFObject.embed(events[cellValue-1].Location, "#outboxPdf");/*change my-container to pdf*/
}

function loadCommunication(){

    $("#communication").load("communication.html");


}



function wait(ms) {
        var start = new Date().getTime();
        var end = start;
        while (end < start + ms) {
            end = new Date().getTime();
        }
    }








































/*


















        

    $(function () {

        $('#message').submit(function (e) {


            e.preventDefault(); // prevents page reloading
            console.log($('#m').val());

            socket.emit('message', $('#m').val());
            return false;
        });
        socket.on('message', function(msg){
            $('#recieveList').append($('<li>').text(msg));
        });

        socket.emit('ngoList', 'ready');
        socket.on('ngoList', function (msg) {
            console.log(msg);

           // if(msg.ngoUsers[0] != null) {
                //Recieve
                console.log("new NGO")
               // console.log(msg.ngoUsers[0].name);
                //ngoUsers = msg.ngoUsers;
                //for (i = 0; i < ngoUsers.length; i++) {
                    $('#ngoList').append($('<li>').text(msg));
                //}
            //}
        });

    });



    $(function () {
        $('#formNGOCount').submit(function (e) {
            ngoCount = $('#input').val();
            e.preventDefault(); // prevents page reloading
            $(this).parent().remove();
            var x = document.URL.split('/');
            x = x[2] + "/trainee";
            document.getElementById("p1").innerHTML = "Overseer please inform your trainees to navigate to this URL:" +
            x;


            $("<p>" + x + "<br>" +
                "Connected NGO's:" + "<br>" +
                "</p>" +
                "<div id='ngoList'" +
                "<ul class='ngoList'></ul> " +
                "</div>"
            ).appendTo('body');



            return false;
        });






            /!*!//add chat box
            $("<div class='messages'>" +
                "<p>" + "Messages Recieved: " + "</p>" +
                "<ul id='recieveList'></ul> " +
                "<form id = 'message' action=''/>" +
                "<input id='m'/><button>Send</button>" +
                "</form>" +
                "</div>"
            ).appendTo('body');

            console.log("test");*!/



    });







*/
