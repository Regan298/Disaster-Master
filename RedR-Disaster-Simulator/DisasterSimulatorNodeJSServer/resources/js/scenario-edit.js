const socket = io();

var data;

// Retrieve the simulation data from server
socket.emit('simState', 'request', function (simdata) {
    data = simdata.simData;
    console.log(data);
    drawDetails(data);
    drawEvents(data.eventsList);
});

function drawDetails(data){
    $('#details').empty();
    $('#details').append("<h6>Title: "+data.title+"</h6>" +
                        "<button onclick='editTitle()'>Edit</button><div id='editTitle'></div>");
}

function editTitle(){
    $('#editTitle').empty();
    $('#editTitle').append("<form id='titleForm'></form>" +
                            "Title: <input form='titleForm' type='text' name='recipient' value='"+data.title+"'><br>"+
                            "<input form='titleForm' type='button' onclick='updateTitle()' value='Submit'>" +
                            "<button type='button' onclick=cancelEdit('#editTitle')>Cancel</button>");
}

function updateTitle(){
    let frmData = document.getElementById("titleForm");
}

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
    console.log("/resources/" + data.eventsList[eventNum].location);
    $('#editForm'+eventNum).empty();
    $("#editForm"+eventNum).append("<form id='frm"+eventNum+"' enctype='multipart/form-data'></form>" +
                                    // "<form id='upload' method='post' enctype='multipart/form-data' action='/upload-event-file'></form>" +
                                    "NGO Recipient: <input form='frm"+eventNum+"' type='text' name='recipient' value='"+data.eventsList[eventNum].recipient+"'><br>"+
                                    "Subject: <input form='frm"+eventNum+"' type='text' name='subject' value='"+data.eventsList[eventNum].subject+"'><br>"+
                                    "Time: <input form='frm"+eventNum+"' type='text' name='time' value='"+data.eventsList[eventNum].time+"'><br>" +
                                    "Type: <select form='frm"+eventNum+"' name='type' value='"+data.eventsList[eventNum].type+"'>" +
                                    "<option value='pdf'>PDF</option>" +
                                    "<option value='video'>Video</option>" +
                                    "<option value='audio'>Audio</option>" +
                                    "</select><br>" +
                                    "File: "+ data.eventsList[eventNum].location +
                                    "<br><input form='frm"+eventNum+"' type='file' name='eventFile'>" +
                                    // "<input form='upload' type='submit' value='Change File'><br>" +
                                    "<input form='frm"+eventNum+"' type='button' onclick='updateEvent("+eventNum+")' value='Submit'>" +
                                    "<button type='button' onclick=cancelEdit('#editForm"+eventNum+"')>Cancel</button>");
}

function cancelEdit(form) {
    console.log(form);
    $(form).empty();
}

function addEvent() {
    let frmData = document.getElementById("addForm");
    let file = frmData.elements[4].files[0];
    console.log(file);
    uploadFiles(file);

    let newEvent = {
        recipient: frmData.elements[0].value,
        subject: frmData.elements[1].value,
        time: frmData.elements[2].value,
        type: frmData.elements[3].value,
        location: '/resources/files/'+file.name
    };
    data.eventsList.push(newEvent);

    drawEvents(data.eventsList);
}

function updateEvent(eventNum){
    let frmData = document.getElementById("frm"+eventNum);
    let file = frmData.elements[4].files[0];
    console.log(file);
    uploadFiles(file);
    // var formData = new FormData();
    // formData.append('file', file);

    // var request = new XMLHttpRequest();
    // request.open("POST", "/upload-event-file");
    // request.send(formData);

    // $.post("/upload-event-file", {file: file}, function(result){
    //     console.log('uploaded');
    // });
    // $.ajax({
    //     url: '/upload-event-file',
    //     type: 'POST',
    //     contentType: 'multipart/form-data',
    //     ProceData: false, /// Add this line without processing parameters
    //     data: frmData,
    //     success: function (result) {
    //       console.log(result);
    //     }
    // });

    data.eventsList[eventNum].recipient = frmData.elements[0].value;
    data.eventsList[eventNum].subject = frmData.elements[1].value;
    data.eventsList[eventNum].time = frmData.elements[2].value;
    data.eventsList[eventNum].type = frmData.elements[3].value;
    data.eventsList[eventNum].location = '/resources/files/'+file.name;

    drawEvents(data.eventsList);
}

function uploadFiles(file) {
    var xhr = new XMLHttpRequest();
    var formData = new FormData();
    // xhr.onload = successfullyUploaded;
    xhr.open("POST", "/upload-event-file", true);
    xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');
    formData.append("upload", file.data);
    xhr.send(formData);
}