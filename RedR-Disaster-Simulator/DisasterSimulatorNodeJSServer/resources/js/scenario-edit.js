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

    var minutes = Math.floor((data.durationMs / 1000 / 60) % 60);
    var hours = Math.floor((data.durationMs / (1000 * 60 * 60)) % 24);
    $('#details').append("<h6>Duration: "+hours+"hrs "+minutes+"mins</h6>" +
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
    var minutes = Math.floor((data.durationMs / 1000 / 60) % 60);
    var hours = Math.floor((data.durationMs / (1000 * 60 * 60)) % 24);
    $('#editDuration').append("<form id='durationForm'></form>" +
                            "Hours: <select form='durationForm' name='hours' value='"+hours+"'>" +
                            "<option value=0>0</option>" +
                            "<option value=1>1</option>" +
                            "<option value=2>2</option>" +
                            "<option value=3>3</option>" +
                            "<option value=4>4</option>" +
                            "<option value=5>5</option>" +
                            "<option value=6>6</option>" +
                            "<option value=7>7</option>" +
                            "<option value=8>8</option>" +
                            "<option value=9>9</option>" +
                            "<option value=10>10</option>" +
                            "<option value=11>11</option>" +
                            "<option value=12>12</option>" +
                            "<option value=13>13</option>" +
                            "<option value=14>14</option>" +
                            "<option value=15>15</option>" +
                            "<option value=16>16</option>" +
                            "<option value=17>17</option>" +
                            "<option value=18>18</option>" +
                            "<option value=19>19</option>" +
                            "<option value=20>20</option>" +
                            "<option value=21>21</option>" +
                            "<option value=22>22</option>" +
                            "<option value=23>23</option>" +
                            "<option value=24>24</option>" +
                            "</select>" +
                            "Minutes: <select form='durationForm' name='mins' value='"+minutes+"'>" +
                            "<option value=0>0</option>" +
                            "<option value=15>15</option>" +
                            "<option value=30>30</option>" +
                            "<option value=45>45</option>" +
                            "</select><br>" +
                            "<input form='durationForm' type='button' onclick='updateDuration()' value='Submit'>" +
                            "<button type='button' onclick=cancelEdit('#editDuration')>Cancel</button>");
}

function updateDuration(){
    let frmData = document.getElementById("durationForm");

    var h = frmData.elements[0].value;
    var m = frmData.elements[1].value;

    var ms = (h * 60 * 60 * 1000) + (m * 60 * 1000);

    data.durationMs = ms;

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
    socket.on('xmlSaved', function () {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/download-save", true);
        xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');
        xhr.send();
        window.open('/download-save');
    });
}