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
    console.log(window.location.pathname + data.eventsList[eventNum].location);
    $('#editForm'+eventNum).empty();
    $("#editForm"+eventNum).append("<form id='frm"+eventNum+"'>NGO Recipient: <input type='text' name='recipient' value='"+data.eventsList[eventNum].recipient+"'><br>"+
                                    "Subject: <input type='text' name='subject' value='"+data.eventsList[eventNum].subject+"'><br>"+
                                    "Time: <input type='text' name='time' value='"+data.eventsList[eventNum].time+"'><br>" +
                                    "Type: <select name='type' form='frm"+eventNum+"' value='"+data.eventsList[eventNum].type+"'>" +
                                    "<option value='pdf'>PDF</option>" +
                                    "<option value='video'>Video</option>" +
                                    "<option value='audio'>Audio</option>" +
                                    "</select><br>" +
                                    "File: <div class='btn btn-primary btn-sm float-centre'>" +
                                    "<input type='file' name='eventFile' value='" + window.location.pathname + data.eventsList[eventNum].location+"'>" +
                                    "</div><br>" +
                                    "<input type='button' onclick='updateEvent("+eventNum+")' value='Submit'></form>");
}

function updateEvent(eventNum){
    let frmData = document.getElementById("frm"+eventNum);

    data.eventsList[eventNum].recipient = frmData.elements[0].value;
    data.eventsList[eventNum].subject = frmData.elements[1].value;
    data.eventsList[eventNum].time = frmData.elements[2].value;
    data.eventsList[eventNum].type = frmData.elements[3].value;
    data.eventsList[eventNum].location = frmData.elements[4].value;

    drawEvents(data.eventsList);
}