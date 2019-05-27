    var ngoCount;
    var ngoUsers;
    const socket = io();

    $(function () {
        <h1>Welcome To the RedR Disaster Simulator</h1>
<p id="p1">Please specify how many NGO's will be particapating in this Simulation</p>

<div class="inputNGOCount">

    <form id="formNGOCount" action="">

        <select id="input">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
        </select>
        <input type="submit">
    </form>


</div>


<div class='messages'>
    <p> Messages Recieved: </p>
    <ul id='recieveList'></ul>
    <form id='message' action=''/>
    <input id='m'/>
    <button>Send</button>
    </form>
</div>
        

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






            /*//add chat box
            $("<div class='messages'>" +
                "<p>" + "Messages Recieved: " + "</p>" +
                "<ul id='recieveList'></ul> " +
                "<form id = 'message' action=''/>" +
                "<input id='m'/><button>Send</button>" +
                "</form>" +
                "</div>"
            ).appendTo('body');

            console.log("test");*/



    });








