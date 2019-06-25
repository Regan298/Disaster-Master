const socket = io();
var simTitle;
var ngos = [];
var started;
var events = [];
var rowCount = 0;


//Load Page Elements
//loadCommunication();
loadScenarioHeader();
//handleNGOS();

function loadScenarioHeader(){

    socket.on('simState', function (data) {
        if(!started) {
            console.log("HERE");
            started = true;
            simTitle = data.simData.title;
            var url = document.URL.split('/');
            url = url[2] + "/ngo";

            var htmlContent = "<h1 class='titles'><span>Scenario: " + simTitle +  "</span></h1>" +
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

        $('<style>'+
            "#" + to + " li:nth-child(odd){ " +
            "    text-align: center;\n" +
            "    color: red;\n" +
            "    font-weight: bold;\n" +
            "}"

            +'</style>').appendTo(document.head);

    });

	/*//on receive event
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

    });*/

});

$(function () {

console.log("ngo");
    /*if(ngos != null) {*/

    $("#messagingElement").append("<div class='messagingButtons'></div>");

        $(".messagingButtons").append("<button class=\"btn btn-secondary\" onclick=\"switchNGOChat(this, 'ngo1')\" id=\"ngo1Button\">PeaceDoves</button>");

        $(".messagingButtons").append("<button class=\"btn btn-secondary\" onclick=\"switchNGOChat(this, 'ngo2')\" id=\"ngo2Button\">PeaceDoves2</button>");

    $(".messagingButtons").append("<button class=\"btn btn-secondary\" onclick=\"switchNGOChat(this, 'ngo3')\" id=\"ngo3Button\">PeaceDoves3</button>");

    $(".messagingButtons").append("<button class=\"btn btn-secondary\" onclick=\"switchNGOChat(this, 'ngo4')\" id=\"ngo4Button\">PeaceDoves4</button>");

    $(".messagingButtons").append("<button class=\"btn btn-secondary\" onclick=\"switchNGOChat(this, 'ngo5')\" id=\"ngo5Button\">PeaceDoves5</button>");

    $(".messagingButtons").append("<button class=\"btn btn-secondary\" onclick=\"switchNGOChat(this, 'ngo6')\" id=\"ngo6Button\">PeaceDoves6</button>");

    $(".messagingButtons").append("<button class=\"btn btn-secondary\" onclick=\"switchNGOChat(this, 'ngo7')\" id=\"ngo7Button\">PeaceDoves7</button>");

    $(".messagingButtons").append("<button class=\"btn btn-secondary\" onclick=\"switchNGOChat(this, 'ngo8')\" id=\"ngo8Button\">PeaceDovesPeaceDoves</button>");

        $("#messagingElement").append("<div class='messagingContent'></div>");

        $(".messagingContent").append("<div id=\"ngo2\" class=\"tabcontent\">\n" +
            "  <ul>\n" +
            "    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ante nisi, mollis nec dignissim dignissim, rutrum eu eros. Integer ullamcorper vel urna in dictum. Mauris tempor, lectus at iaculis venenatis, lectus quam pellentesque nibh, non mollis velit dolor eget ipsum. Duis nec laoreet arcu. Sed risus est, pulvinar a lacinia vitae, elementum in sapien. Vestibulum urna turpis, laoreet id eros in, varius fringilla ipsum. </li>\n" +
            "    <li>cat1</li>\n" +
            "    <li>ca2</li>\n" +
            "    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ante nisi, mollis nec dignissim dignissim, rutrum eu eros. Integer ullamcorper vel urna in dictum. Mauris tempor, lectus at iaculis venenatis, lectus quam pellentesque nibh, non mollis velit dolor eget ipsum. Duis nec laoreet arcu. Sed risus est, pulvinar a lacinia vitae, elementum in sapien. Vestibulum urna turpis, laoreet id eros in, varius fringilla ipsum.</li>\n" +
            "    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ante nisi, mollis nec dignissim dignissim, rutrum eu eros. Integer ullamcorper vel urna in dictum. Mauris tempor, lectus at iaculis venenatis, lectus quam pellentesque nibh, non mollis velit dolor eget ipsum. Duis nec laoreet arcu. Sed risus est, pulvinar a lacinia vitae, elementum in sapien. Vestibulum urna turpis, laoreet id eros in, varius fringilla ipsum.</li>\n" +
            "\n" +
            "  </ul>\n" +
            "\n" +
            "\n" +
            "</div>");

        $(".messagingContent").append("<div id=\"ngo1\" class=\"tabcontent\">\n" +
                "  <ul>\n" +
                "    <li>cat</li>\n" +
                "    <li>cat1</li>\n" +
                "    <li>ca2</li>\n" +
                "    <li>ca3</li>\n" +
                "    <li>cat4</li>\n" +
                "\n" +
                "  </ul>\n" +
                "\n" +
                "\n" +
                "</div>");


    $(".messagingContent").append("<div id=\"messageingForm\">\n" +
        "          <form action=\"\" id=\"messageHQ\">\n" +
        "            <textarea form=\"messageHQ\" id=\"input\"></textarea>\n" +
        "            <input type=\"submit\" value=\"Send\" class=\"button\"/>\n" +
        "          </form>\n" +
        "        </div>");

    switchNGOChat();

   /* }*/
});

function switchNGOChat(elmnt, ngo) {

    //Highlight selected button and unlight non selected
    if(ngo != null) {

        buttons = document.getElementsByClassName("btn btn-secondary");
        for (i = 0; i < buttons.length; i++) {
            buttons[i].style.backgroundColor = "#b5b5b5";
        }

        document.getElementById(ngo+"Button").style.backgroundColor = "#EE2A2B";
    }




    // Hide all elements with class="tabcontent" by default */
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Show the specific tab content
    if(ngo != null) {
        console.log("ngoselected: " + ngo);
        document.getElementById(ngo).style.display = "block";
    }
}
/*document.getElementById("defaultOpen").click();*/


function openView() {


}

//redraw()
//getSelection()




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
