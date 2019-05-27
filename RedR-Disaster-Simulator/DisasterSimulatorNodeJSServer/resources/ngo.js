const socket = io();
var name;


loadNGOTitle();
loadCommunication();
handleNGOS();



//Handle Messaging Form
$(function () {

    $('#message').submit(function (e) {
        e.preventDefault(); // prevents page reloading
        console.log("submitmessage");


        console.log($('#ngoRecipient').val());

        var message = {
            from: name,
            recipient: $('#ngoRecipient').val(),
            content: $('#input').val()
        }

        $('#input').val('');
        socket.emit('message', {message});

    });

    socket.on('message', function (msg) {
        console.log(msg.recievedMessage.content);
       var from = msg.recievedMessage.from;
       console.log('#'+from);
       $('#'+from).append($('<li>').text(msg.recievedMessage.content));

    });




});

function handleNGOS(){
    socket.on('users', function (data) {
        var users = data.ngoUsers;
        for(var i = 0; i < users.length; i++) {
            $('#ngoList').append("<ul id='" + users[i].name + "'>" + "NGO: " + users[i].name + "</ul>");

            $('#ngoRecipient').append($('<option>', {
                value: users[i].name,
                text: users[i].name

            }));
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




function loadCommunication(){

    $("#communication").load("communication.html");


}