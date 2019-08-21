const socket = io();

var data;

// Retrieve the simulation data from server
socket.emit('simState', 'request', function (simdata) {
    data = simdata.simData;
    // simData object structure
    // var simData = {
    //     ready: false,
    //     title: "",
    //     ngoCount: 999,
    //     ngoList: [],
    //     eventsList: [],
    //     messageList: [],
    //     durationMs: 0,
    //     timeScale: 0,
    //     started: false,
    //     modeOnline: true,
    //     occurredEvents: []
    // };
    drawDetails(data);
    drawEvents(data.eventsList);
});

function drawDetails(data){
    $('#details').empty();
    $('#details').append("<h6>Online: "+data.modeOnline+"</h6>" +
                        "<button onclick='editType()'>Edit</button><div id='editType'></div>");
    $('#details').append("<h6>Title: "+data.title+"</h6>" +
                        "<button onclick='editTitle()'>Edit</button><div id='editTitle'></div>");
    $('#details').append("<h6>Duration: "+data.durationMs+"</h6>" +
                        "<button onclick='editDuration()'>Edit</button><div id='editDuration'></div>");
    $('#details').append("<h6>Hours in a Simulation Day: "+24/data.timeScale+"</h6>" +
                        "<button onclick='editScale()'>Edit</button><div id='editScale'></div>");
    $('#details').append("<div id='ngos'></div>");
    drawNgos();
}

function drawNgos() {
    $('#ngos').empty();
    $('#ngos').append("<h6>NGOs:</h6>" +
                        "<ul id='ngoList'></ul>");
    for(var i=0; i < data.ngoList.length; i++){
        $("#ngoList").append("<li>"+data.ngoList[i].name+"<button onclick=editNgo("+i+")>Edit</button><div id='ngoForm"+i+"'></div></li>")
    }
    newNgo();
    newEvent();
}

function newNgo() {
    $('#ngoList').append("<br><h6>New:</h6>" +
                        "<form id='ngoForm'></form>" +
                        "NGO Name: <input form='ngoForm' type='text' name='name'><br>"+
                        "NGO Passkey: <input form='ngoForm' type='text' name='passkey'><br>"+
                        "<input form='ngoForm' type='button' onclick='addNgo()' value='Submit'>");
}

function addNgo() {
    let frmData = document.getElementById("ngoForm");

    let ngo = {
        name: frmData.elements[0].value,
        passkey: frmData.elements[1].value
    };
    data.ngoList.push(ngo);

    drawNgos();
}

function editType(){
    $('#editType').empty();
    $('#editType').append("<form id='typeForm'></form>" +
                            "Type: <select form='typeForm' name='type' value='"+data.modeOnline+"'>" +
                            "<option value='true'>true</option>" +
                            "<option value='false'>false</option>" +
                            "</select><br>" +
                            "<input form='typeForm' type='button' onclick='updateType()' value='Submit'>" +
                            "<button type='button' onclick=cancelEdit('#editType')>Cancel</button>");
}

function updateType(){
    let frmData = document.getElementById("typeForm");

    data.modeOnline = frmData.elements[0].value;

    $('#editType').empty();
    drawDetails(data);
}

function editTitle(){
    $('#editTitle').empty();
    $('#editTitle').append("<form id='titleForm'></form>" +
                            "Title: <input form='titleForm' type='text' name='title' value='"+data.title+"'><br>"+
                            "<input form='titleForm' type='button' onclick='updateTitle()' value='Submit'>" +
                            "<button type='button' onclick=cancelEdit('#editTitle')>Cancel</button>");
}

function updateTitle(){
    let frmData = document.getElementById("titleForm");

    data.title = frmData.elements[0].value;

    $('#editTitle').empty();
    drawDetails(data);
}

function editDuration(){
    $('#editDuration').empty();
    $('#editDuration').append("<form id='durationForm'></form>" +
                            "Duration: <input form='durationForm' type='text' name='duration' value='"+data.durationMs+"'><br>"+
                            "<input form='durationForm' type='button' onclick='updateDuration()' value='Submit'>" +
                            "<button type='button' onclick=cancelEdit('#editDuration')>Cancel</button>");
}

function updateDuration(){
    let frmData = document.getElementById("durationForm");

    data.durationMs = frmData.elements[0].value;

    $('#editDuration').empty();
    drawDetails(data);
}

function editScale(){
    $('#editScale').empty();
    $('#editScale').append("<form id='scaleForm'></form>" +
                            "Scale: <input form='scaleForm' type='text' name='scale' value='"+24/data.timeScale+"'><br>"+
                            "<input form='scaleForm' type='button' onclick='updateScale()' value='Submit'>" +
                            "<button type='button' onclick=cancelEdit('#editScale')>Cancel</button>");
}

function updateScale(){
    let frmData = document.getElementById("scaleForm");

    data.timeScale = 24/frmData.elements[0].value;

    $('#editScale').empty();
    drawDetails(data);
}

function editNgo(ngoNum){
    $('#ngoForm'+ngoNum).empty();
    $('#ngoForm'+ngoNum).append("<form id='ngoForm"+ngoNum+"'></form>" +
                            "NGO Name: <input form='ngoForm"+ngoNum+"' type='text' name='name' value='"+data.ngoList[ngoNum].name+"'><br>"+
                            "NGO Passkey: <input form='ngoForm"+ngoNum+"' type='text' name='passkey' value='"+data.ngoList[ngoNum].passkey+"'><br>"+
                            "<input form='ngoForm"+ngoNum+"' type='button' onclick='updateNgo("+ngoNum+")' value='Submit'>" +
                            "<button type='button' onclick=cancelEdit('#ngoForm"+ngoNum+"')>Cancel</button>");
}

function updateNgo(ngoNum){
    let frmData = document.getElementById("ngoForm");

    data.ngoList[ngoNum].name = frmData.elements[0].value;
    data.ngoList[ngoNum].passkey = frmData.elements[1].value;

    $('#ngoForm'+ngoNum).empty();
    drawDetails(data);
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

    newEvent();
}

function newEvent() {
    var ngoOptions = '';
    for(var i=0; i < data.ngoList.length; i++){
        ngoOptions += "<option value='"+data.ngoList[i].name+"'>"+data.ngoList[i].name+"</option>";
    }
    $('#newEvent').empty();
    $('#newEvent').append("<form id='addForm' enctype='multipart/form-data'></form>" +
                            "NGO Recipient: <select form='addForm' name='type'>"+
                            ngoOptions +
                            "</select><br>" +
                            "Subject: <input form='addForm' type='text' name='subject'><br>" +
                            "Time: <input form='addForm' type='text' name='time'><br>" +
                            "Type: <select form='addForm' name='type'>" +
                            "<option value='pdf'>PDF</option>" +
                            "<option value='video'>Video</option>" +
                            "<option value='audio'>Audio</option>" +
                            "<option value='image'>Image</option>" +
                            "</select><br>" +
                            "File: <br><input form='addForm' type='file' name='eventFile'>" +
                            "<input form='addForm' type='button' onclick=addEvent() value='Submit'></input>");
    
}

function editEvent(eventNum){
    $('#editForm'+eventNum).empty();
    var ngoOptions = '';
    for(var i=0; i < data.ngoList.length; i++){
        ngoOptions += "<option value='"+data.ngoList[i].name+"'>"+data.ngoList[i].name+"</option>";
    }
    $("#editForm"+eventNum).append("<form id='frm"+eventNum+"' enctype='multipart/form-data'></form>" +
                                    "NGO Recipient: <select form='frm"+eventNum+"' name='type' value='"+data.eventsList[eventNum].recipient+"'>"+
                                    ngoOptions +
                                    "</select><br>" +
                                    "Subject: <input form='frm"+eventNum+"' type='text' name='subject' value='"+data.eventsList[eventNum].subject+"'><br>"+
                                    "Time: <input form='frm"+eventNum+"' type='text' name='time' value='"+data.eventsList[eventNum].time+"'><br>" +
                                    "Type: <select form='frm"+eventNum+"' name='type' value='"+data.eventsList[eventNum].type+"'>" +
                                    "<option value='pdf'>PDF</option>" +
                                    "<option value='video'>Video</option>" +
                                    "<option value='audio'>Audio</option>" +
                                    "</select><br>" +
                                    "File: "+ data.eventsList[eventNum].location +
                                    "<br><input form='frm"+eventNum+"' type='file' name='eventFile'>" +
                                    "<input form='frm"+eventNum+"' type='button' onclick='updateEvent("+eventNum+")' value='Submit'>" +
                                    "<button type='button' onclick=cancelEdit('#editForm"+eventNum+"')>Cancel</button>");
}

function cancelEdit(form) {
    $(form).empty();
}

function addEvent() {
    let frmData = document.getElementById("addForm");
    let file = frmData.elements[4].files[0];
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
    uploadFiles(file);

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
    xhr.open("POST", "/upload-event-file", true);
    xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');
    formData.append("upload", file);
    xhr.send(formData);
}

function saveXML() {
    socket.emit('exportXML', data);
}