const socket = io();
var name;
var users = [];

loadNGOTitle();
loadCommunication();
handleNGOS();



//Handle Messaging Form
$(function () {


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