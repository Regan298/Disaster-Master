const socket = io();

var data;

// Retrieve the simulation data from server
socket.on('simState', function (simdata) {
    data = simdata.simData;
    console.log(data);
    drawEvents(data.eventsList);
});

// Display a list of events
function drawEvents(events){
    // event object format
    // var event = {
    //     id: i,
    //     recipient: currentEventRecipient,
    //     time: currentEventTime,
    //     type: currentEventType,
    //     location: currentEventLocation,
    //     subject: currentEventSubject
    // }

    $("#events").empty();
    for(var i=0; i < events.length; i++){
        $("#events").append("<li>"+events[i].recipient+": "+events[i].subject+"<button onclick='editEvent("+i+")'>Edit</button><div id='editForm"+i+"'></div></li>")
    }
}

function editEvent(eventNum){
    $("#editForm"+eventNum).append("<form id='frm"+eventNum+"'>NGO Recipient: <input type='text' name='recipient'><br>"+
                                    "Subject: <input type='text' name='subject'><br>"+
                                    "<input type='button' onclick='updateEvent("+eventNum+")' value='Submit'></form>")
}

function updateEvent(eventNum){
    let frmData = document.getElementById("frm"+eventNum);

    data.eventsList[eventNum].recipient = frmData.elements[0].value;
    data.eventsList[eventNum].subject = frmData.elements[1].value;

    drawEvents(data.eventsList);
}