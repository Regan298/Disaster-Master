var ngoCount;
var ngoUsers;
const socket = io();
var simTitle;
var simStarted = false;

//Handle Page Elements
$(function () {
    socket.on('simState', function (data) {

        if (data.simData['ready'] == true && !simStarted) {
            console.log("HERE")
            simStarted = true;
            console.log("config complete");
            simTitle = data.simData.title;
            $(".welcome").remove();
            loadScenarioHeader();
            loadCommunication();


        } else {
            $("#welcome").load("loadSimFile.html");
        }
    });
});

//Handle Messaging Form
$(function () {

    socket.on('ngoList', function (data) {

        var ngos = data.ngoUsers;
        console.log(ngos[0]);
        $('#ngoRecipient').append($('<option>', {
            value: ngos[ngos.length-1].name,
            text: ngos[ngos.length-1].name

        }));


    });


    $('#message').submit(function (e) {
        console.log("submitmessage");
        e.preventDefault(); // prevents page reloading

        console.log($('#ngoRecipient').val());

        /*var message = {
             recipient = $('#ngoRecipient').val()
         }
        */socket.emit('message', $('#messageContent').val());

    });




});


function loadScenarioHeader(){
    var url = document.URL.split('/');
    url = url[2] + "/ngo";

    var htmlContent = "<h1>Scenario: " + simTitle + "</h1>" +
        "<h2> Please inform your NGO's to go to this page: " + url + "</h2>";

    $(htmlContent).appendTo(".scenarioHeader");

}

function loadCommunication(){
    $("#communication").load("communication.html");


    /*var htmlContent = "<h1>Communication</h1>" +
        /!*"<form id='message' action=''/>" +
        "<input type='text' id='input'/>" +*!/
        "<button type='button' id='submitBtn'>Submit Form</button>";
        /!*"</form>";*!/

    $(htmlContent).appendTo(".communication");*/


    /*"<select form = 'message' id='ngoRecipient'>" +
    "</select>" +*/

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
