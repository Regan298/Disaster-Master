// eslint-disable-next-line no-undef
const socket = io();

var data;

// Retrieve the simulation data from server
socket.emit('simState', 'request', function (simdata) {
    data = simdata.simData;
    // simData object structure
    // loaded: false,
    // ready: false,
    // title: "",
    // ngoCount: 999,
    // ngoList: [],
    // eventsList: [],
    // messageList: [],
    // durationMs: 0,
    // timeScale: 0,
    // started: false,
    // modeOnline: true,
    // occurredEvents: [],
    // library: [],
    // startTimeMS: 0,
    // isRunning: false,
    // EventTags: ['Cow', 'cat', 'chicken'],
    // ngoStatusReports: []
    console.log(data);
    $(function () {
        drawDetails(data);
        drawEvents(data.eventsList);
        drawLibrary(data.library);
    });
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
    $('#details').append("<div id='tags'></div>");
    drawTags();
}

function drawTags() {
    $('#tags').empty();
    $('#tags').append("<h6>Tags</h6>" +
                        "<ul id='tagList'></ul>");
    for(var i=0; i < data.EventTags.length; i++){
        $("#tagList").append("<li>"+data.EventTags[i]+"<button onclick=editTag("+i+")>Edit</button><div id='tagForm"+i+"'></div></li>");
    }

    newTag();
}

function newTag() {
    $('#tagList').append("<br><h6>New:</h6>" +
                        "<form id='tagForm'></form>" +
                        "Tag: <input form='tagForm' id='newTag' type='text' name='tag'><br>"+
                        "<input form='tagForm' type='button' onclick='addTag()' value='Submit'>");
}

// eslint-disable-next-line no-unused-vars
function addTag() {
    data.EventTags.push($("#newTag").val());

    $('#tagForm').empty();
    drawTags();
}

// eslint-disable-next-line no-unused-vars
function editTag(tagNum){
    $('#tagForm'+tagNum).empty();
    $('#tagForm'+tagNum).append("<form id='tagForm"+tagNum+"'></form>" +
                            "Tag: <input form='tagForm"+tagNum+"' type='text' id='tagname' name='name' value='"+data.EventTags[tagNum]+"'><br>"+
                            "<input form='tagForm"+tagNum+"' type='button' onclick='updateTag("+tagNum+")' value='Submit'>" +
                            "<button type='button' onclick=cancelEdit('#tagForm"+tagNum+"')>Cancel</button>" +
                            "<button type='button' onclick=deleteTag('"+tagNum+"')>DELETE</button>");
}

// eslint-disable-next-line no-unused-vars
function deleteTag(tagNum){
    data.EventTags.splice(tagNum, 1);
    drawTags(data.EventTags);
}

// eslint-disable-next-line no-unused-vars
function updateTag(tagNum){
    data.EventTags[tagNum] = $("#tagname").val();

    $('#tagForm'+tagNum).empty();
    drawTags();
}

// eslint-disable-next-line no-unused-vars
function editType(){
    $('#editType').empty();
    var options = '';
    if(data.modeOnline){
        options = "<option value=true selected>true</option>" + "<option value=false>false</option>";
    }else {
        options = "<option value=true>true</option>" + "<option value=false selected>false</option>";
    }
    $('#editType').append("<form id='typeForm'></form>" +
                            "Type: <select form='typeForm' name='type' value='"+data.modeOnline+"'>" +
                            options +
                            "</select><br>" +
                            "<input form='typeForm' type='button' onclick='updateType()' value='Submit'>" +
                            "<button type='button' onclick=cancelEdit('#editType')>Cancel</button>");
}

// eslint-disable-next-line no-unused-vars
function updateType(){
    // eslint-disable-next-line no-undef
    let frmData = document.getElementById("typeForm");

    data.modeOnline = (frmData.elements[0].value === 'true');

    $('#editType').empty();
    drawDetails(data);
}

// eslint-disable-next-line no-unused-vars
function editTitle(){
    $('#editTitle').empty();
    $('#editTitle').append("<form id='titleForm'></form>" +
                            "Title: <input form='titleForm' type='text' name='title' value='"+data.title+"'><br>"+
                            "<input form='titleForm' type='button' onclick='updateTitle()' value='Submit'>" +
                            "<button type='button' onclick=cancelEdit('#editTitle')>Cancel</button>");
}

// eslint-disable-next-line no-unused-vars
function updateTitle(){
    // eslint-disable-next-line no-undef
    let frmData = document.getElementById("titleForm");

    data.title = frmData.elements[0].value;

    $('#editTitle').empty();
    drawDetails(data);
}

// eslint-disable-next-line no-unused-vars
function editDuration(){
    $('#editDuration').empty();
    var minutes = Math.floor((data.durationMs / 1000 / 60) % 60);
    var hours = Math.floor((data.durationMs / (1000 * 60 * 60)) % 24);
    $('#editDuration').append("<form id='durationForm'></form>" +
                            "Hours: <input form='durationForm' type='number' name='scale' min='0' max='24' step='1' value='"+hours+"'><br>"+
                            "Minutes: <input form='durationForm' type='number' name='scale' min='0' max='59' step='1' value='"+minutes+"'><br>" +
                            "<input form='durationForm' type='button' onclick='updateDuration()' value='Submit'>" +
                            "<button type='button' onclick=cancelEdit('#editDuration')>Cancel</button>");
}

// eslint-disable-next-line no-unused-vars
function updateDuration(){
    // eslint-disable-next-line no-undef
    let frmData = document.getElementById("durationForm");

    var h = frmData.elements[0].value;
    var m = frmData.elements[1].value;

    var ms = (h * 60 * 60 * 1000) + (m * 60 * 1000);

    data.durationMs = ms;

    $('#editDuration').empty();
    drawDetails(data);
}

// eslint-disable-next-line no-unused-vars
function editScale(){
    $('#editScale').empty();
    $('#editScale').append("<form id='scaleForm'></form>" +
                            "<input form='scaleForm' type='number' name='scale' min='0.5' max='24' step='0.5' value='"+24/data.timeScale+"'><br>"+
                            "<input form='scaleForm' type='button' onclick='updateScale()' value='Submit'>" +
                            "<button type='button' onclick=cancelEdit('#editScale')>Cancel</button>");
}

// eslint-disable-next-line no-unused-vars
function updateScale(){
    // eslint-disable-next-line no-undef
    let frmData = document.getElementById("scaleForm");

    data.timeScale = 24/frmData.elements[0].value;

    $('#editScale').empty();
    drawDetails(data);
}

function drawNgos() {
    $('#ngos').empty();
    $('#ngos').append("<h6>NGOs:</h6>" +
                        "<ul id='ngoList'></ul>");
    for(var i=0; i < data.ngoList.length; i++){
        $("#ngoList").append("<li>"+data.ngoList[i].name+"<button onclick=editNgo("+i+")>Edit</button><div id='ngoForm"+i+"'></div></li>");
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

// eslint-disable-next-line no-unused-vars
function addNgo() {
    // eslint-disable-next-line no-undef
    let frmData = document.getElementById("ngoForm");
    if(frmData.elements[1].value === ''){
        // eslint-disable-next-line no-undef
        return alert('Must enter a passkey');
    }
    for(var j=0; j<data.ngoList.length; j++){
        if(frmData.elements[1].value === data.ngoList[j].passkey[0]){
            // eslint-disable-next-line no-undef
            return alert('Passkeys must be unique');
        }
    }
    let ngo = {
        id: data.ngoList.length,
        name: [frmData.elements[0].value.replace(/ /g, "_")],
        passkey: frmData.elements[1].value
    };
    data.ngoList.push(ngo);

    drawNgos();
}

// eslint-disable-next-line no-unused-vars
function editNgo(ngoNum){
    $('#ngoForm'+ngoNum).empty();
    $('#ngoForm'+ngoNum).append("<form id='ngoForm"+ngoNum+"'></form>" +
                            "NGO Name: <input form='ngoForm"+ngoNum+"' type='text' id='ngoname' name='name' value='"+data.ngoList[ngoNum].name+"'><br>"+
                            "NGO Passkey: <input form='ngoForm"+ngoNum+"' type='text' id='ngopasskey' name='passkey' value='"+data.ngoList[ngoNum].passkey+"'><br>"+
                            "<input form='ngoForm"+ngoNum+"' type='button' onclick='updateNgo("+ngoNum+")' value='Submit'>" +
                            "<button type='button' onclick=cancelEdit('#ngoForm"+ngoNum+"')>Cancel</button>" +
                            "<button type='button' onclick=deleteNgo('"+ngoNum+"')>DELETE</button>");
}

// eslint-disable-next-line no-unused-vars
function updateNgo(ngoNum){
    //for some reason works only with jQuery and not with the regular document.getElementsById...
    if($("#ngopasskey").val() === ''){
        return alert('Must enter a passkey');
    }
    for(var j=0; j<data.ngoList.length; j++){
        if(j === ngoNum){ continue; }
        if($("#ngopasskey").val() === data.ngoList[j].passkey[0]){
            return alert('Passkeys must be unique');
        }
    }
    data.ngoList[ngoNum].name = $("#ngoname").val().replace(/ /g, "_");
    data.ngoList[ngoNum].passkey = $("#ngopasskey").val();

    $('#ngoForm'+ngoNum).empty();
    drawDetails(data);
}

// eslint-disable-next-line no-unused-vars
function deleteNgo(ngoNum){
    var ngoName = (data.ngoList[ngoNum].name[0]);
    data.ngoList.splice(ngoNum, 1);

    // Remove all associated events
    var splice = [];
    for(var e=0; e<data.eventsList.length; e++){
        console.log(data.eventsList[e].recipient[0]);
        if(data.eventsList[e].recipient[0] === ngoName){
            console.log(e);
            splice.push(e);
        }
    }
    while(splice.length) {
        data.eventsList.splice(splice.pop(), 1);
    }

    drawNgos(data.ngoList);
    drawEvents(data.eventsList);
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
        $("#events").append("<li>"+events[i].recipient+": "+events[i].subject+" - "+events[i].time+"<button onclick='editEvent("+i+")'>Edit</button><div id='editForm"+i+"'></div></li>");
    }

    newEvent();
}

function newEvent() {
    var ngoOptions = "<option value='All'>All</option>";
    for(var i=0; i < data.ngoList.length; i++){
        ngoOptions += "<option value='"+data.ngoList[i].name+"'>"+data.ngoList[i].name+"</option>";
    }
    $('#newEvent').empty();
    $('#newEvent').append("<form id='addForm' enctype='multipart/form-data'></form>" +
                            "NGO Recipient: <select form='addForm' name='type'>"+
                            ngoOptions +
                            "</select><br>" +
                            "Subject: <input form='addForm' type='text' name='subject'><br>" +
                            "Scheduled (real) Time: <br><input form='addForm' type='number' name='scale' min='0' max='24' step='1'>hrs "+
                            "<input form='addForm' type='number' name='scale' min='0' max='59' step='1'>mins " +
                            "<input form='addForm' type='number' name='scale' min='0' max='59' step='1'>secs<br>" +
                            "Type: <select form='addForm' name='type'>" +
                            "<option value='pdf'>pdf</option>" +
                            "<option value='video'>video</option>" +
                            "<option value='audio'>audio</option>" +
                            "<option value='image'>image</option>" +
                            "</select><br>" +
                            "File: <br><input form='addForm' type='file' name='eventFile'>" +
                            "<input form='addForm' type='button' onclick=addEvent() value='Submit'></input>");
    
}

// eslint-disable-next-line no-unused-vars
function editEvent(eventNum){
    $('#editForm'+eventNum).empty();
    var ngoOptions = "<option value='All'>All</option>";
    var selectedOption = '';
    for(var i=0; i < data.ngoList.length; i++){
        if(data.eventsList[eventNum].recipient[0] === data.ngoList[i].name[0]){
            selectedOption = 'selected';
        }else{
            selectedOption = '';
        }
        ngoOptions += "<option "+selectedOption+" value='"+data.ngoList[i].name+"'>"+data.ngoList[i].name+"</option>";
    }
    var options = '';
    if (data.eventsList[eventNum].type === 'pdf'){
        options = "<option value='pdf' selected>pdf</option><option value='video'>video</option><option value='audio'>audio</option><option value='image'>image</option>";
    }else if (data.eventsList[eventNum].type === 'video'){
        options = "<option value='pdf'>pdf</option><option value='video' selected>video</option><option value='audio'>audio</option><option value='image'>image</option>";
    }else if (data.eventsList[eventNum].type === 'audio'){
        options = "<option value='pdf'>pdf</option><option value='video'>video</option><option value='audio' selected>audio</option><option value='image'>image</option>";
    }else if (data.eventsList[eventNum].type === 'image'){
        options = "<option value='pdf'>pdf</option><option value='video'>video</option><option value='audio'>audio</option><option value='image' selected>image</option>";
    }
    var time = data.eventsList[eventNum].time[0].split(":");
    $("#editForm"+eventNum).append("<form id='frm"+eventNum+"' enctype='multipart/form-data'></form>" +
                                    "NGO Recipient: <select form='frm"+eventNum+"' name='type' value='"+data.eventsList[eventNum].recipient+"'>"+
                                    ngoOptions +
                                    "</select><br>" +
                                    "Subject: <input form='frm"+eventNum+"' type='text' name='subject' value='"+data.eventsList[eventNum].subject+"'><br>"+
                                    "Scheduled (real) Time: <br><input form='frm"+eventNum+"' type='number' name='scale' min='0' max='24' step='1' value='"+time[0]+"'>hrs "+
                                    "<input form='frm"+eventNum+"' type='number' name='scale' min='0' max='59' step='1' value='"+time[1]+"'>mins " +
                                    "<input form='frm"+eventNum+"' type='number' name='scale' min='0' max='59' step='1' value='"+time[2]+"'>secs<br>" +
                                    "Type: <select form='frm"+eventNum+"' name='type' value='"+data.eventsList[eventNum].type+"'>" +
                                    options +
                                    "</select><br>" +
                                    "File: "+ data.eventsList[eventNum].location +
                                    "<br><input form='frm"+eventNum+"' type='file' name='eventFile'>" +
                                    "<input form='frm"+eventNum+"' type='button' onclick='updateEvent("+eventNum+")' value='Submit'>" +
                                    "<button type='button' onclick=cancelEdit('#editForm"+eventNum+"')>Cancel</button>" +
                                    "<button type='button' onclick=deleteEvent('"+eventNum+"')>DELETE</button>");
}

// eslint-disable-next-line no-unused-vars
function addEvent() {
    let frmData = document.getElementById("addForm");
    let file = frmData.elements[6].files[0];
    uploadFiles(file, 'event');

    var hrs = frmData.elements[2].value;
    var mins = frmData.elements[3].value;
    var secs = frmData.elements[4].value;
    if(isNaN(hrs) || hrs === undefined || hrs<0 || hrs === ''){
        hrs = 0;
    }if(isNaN(mins) || mins === undefined || mins<0 || mins === ''){
        mins = 0;
    }if(isNaN(secs) || secs === undefined || secs<0 || secs === ''){
        secs = 0;
    }

    let newEvent;

    if(frmData.elements[0].value === 'All'){
        for(var l=0; l<data.ngoList.length; l++){
            newEvent = {
                recipient: [data.ngoList[l].name[0]],
                subject: frmData.elements[1].value,
                time: [hrs+":"+mins+":"+secs],
                type: frmData.elements[5].value,
                location: '/currentScenario/files/'+file.name.replace(/ /g, "_")
            };
            data.eventsList.push(newEvent);
        }
    }else{
        newEvent = {
            recipient: [frmData.elements[0].value],
            subject: frmData.elements[1].value,
            time: [hrs+":"+mins+":"+secs],
            type: frmData.elements[5].value,
            location: '/currentScenario/files/'+file.name.replace(/ /g, "_")
        };
        data.eventsList.push(newEvent);
    }
    

    drawEvents(data.eventsList);
}

// eslint-disable-next-line no-unused-vars
function updateEvent(eventNum){
    let frmData = document.getElementById("frm"+eventNum);
    let file = frmData.elements[6].files[0];

    var hrs = frmData.elements[2].value;
    var mins = frmData.elements[3].value;
    var secs = frmData.elements[4].value;
    if(isNaN(hrs) || hrs === undefined || hrs<0 || hrs === ''){
        hrs = 0;
    }if(isNaN(mins) || mins === undefined || mins<0 || mins === ''){
        mins = 0;
    }if(isNaN(secs) || secs === undefined || secs<0 || secs === ''){
        secs = 0;
    }

    if(frmData.elements[0].value === 'All'){
        
        var newEvent;
        for(var l=0; l<data.ngoList.length; l++){
            newEvent = {
                recipient: data.ngoList[l].name,
                subject: frmData.elements[1].value,
                time: [hrs+":"+mins+":"+secs],
                type: frmData.elements[5].value,
                location: data.eventsList[eventNum].location
            };
            if(file){
                newEvent.location = '/currentScenario/files/'+file.name.replace(/ /g, "_");
            }
            data.eventsList.splice(eventNum, 1);
            data.eventsList.push(newEvent);
        }
        if(file){
            uploadFiles(file, 'event');
        }
    }else{
        if(file){
            uploadFiles(file, 'event');
            data.eventsList[eventNum].location = '/currentScenario/files/'+file.name.replace(/ /g, "_");
        }
        
        data.eventsList[eventNum].recipient = frmData.elements[0].value;
        data.eventsList[eventNum].subject = frmData.elements[1].value;
        data.eventsList[eventNum].time = [hrs+":"+mins+":"+secs];
        data.eventsList[eventNum].type = frmData.elements[5].value;
    }
    
    drawEvents(data.eventsList);
}

// eslint-disable-next-line no-unused-vars
function deleteEvent(eventNum){
    data.eventsList.splice(eventNum, 1);
    drawEvents(data.eventsList);
}

function drawLibrary(library){
    $("#library").empty();
    for(var i=0; i < library.length; i++){
        $("#library").append("<li>"+library[i].subject+"<button onclick='editLibraryItem("+i+")'>Edit</button><div id='editLibraryItem"+i+"'></div></li>");
    }

    newLibraryItem();
}

function newLibraryItem() {
    $('#newLibraryItem').empty();
    $('#newLibraryItem').append("<form id='addLibraryItemForm' enctype='multipart/form-data'></form>" +
                            "Subject: <input form='addLibraryItemForm' type='text' name='subject'><br>" +
                            "Type: <select form='addLibraryItemForm' name='type'>" +
                            "<option value='pdf'>pdf</option>" +
                            "<option value='video'>video</option>" +
                            "<option value='audio'>audio</option>" +
                            "<option value='image'>image</option>" +
                            "</select><br>" +
                            "File: <br><input form='addLibraryItemForm' type='file' name='eventFile'>" +
                            "<input form='addLibraryItemForm' type='button' onclick=addLibraryItem() value='Submit'></input>");
}

// eslint-disable-next-line no-unused-vars
function editLibraryItem(libNum){
    $('#editLibraryItem'+libNum).empty();
    var options = '';
    if (data.library[libNum].type === 'pdf'){
        options = "<option value='pdf' selected>pdf</option><option value='video'>video</option><option value='audio'>audio</option><option value='image'>image</option>";
    }else if (data.library[libNum].type === 'video'){
        options = "<option value='pdf'>pdf</option><option value='video' selected>video</option><option value='audio'>audio</option><option value='image'>image</option>";
    }else if (data.library[libNum].type === 'audio'){
        options = "<option value='pdf'>pdf</option><option value='video'>video</option><option value='audio' selected>audio</option><option value='image'>image</option>";
    }else if (data.library[libNum].type === 'image'){
        options = "<option value='pdf'>pdf</option><option value='video'>video</option><option value='audio'>audio</option><option value='image' selected>image</option>";
    }
    $("#editLibraryItem"+libNum).append("<form id='frmLib"+libNum+"' enctype='multipart/form-data'></form>" +
                                    "Subject: <input form='frmLib"+libNum+"' type='text' name='subject' value="+data.library[libNum].subject+"><br>" +
                                    "Type: <select form='frmLib"+libNum+"' name='type'>" +
                                    options +
                                    "</select><br>" +
                                    "File: "+data.library[libNum].location+"<br><input form='frmLib"+libNum+"' type='file' name='eventFile'>" +
                                    "<input form='frmLib"+libNum+"' type='button' onclick=updateLibraryItem("+libNum+") value='Submit'></input>"+
                                    "<button type='button' onclick=cancelEdit('#editLibraryItem"+libNum+"')>Cancel</button>" +
                                    "<button type='button' onclick=deleteLibraryItem('"+libNum+"')>DELETE</button>");
}

// eslint-disable-next-line no-unused-vars
function addLibraryItem() {
    let frmData = document.getElementById("addLibraryItemForm");
    let file = frmData.elements[2].files[0];
    uploadFiles(file, 'library');

    let newLibItem = {
        subject: frmData.elements[0].value,
        type: frmData.elements[1].value,
        location: '/currentScenario/files/library/'+file.name.replace(/ /g, "_")
    };
    data.library.push(newLibItem);

    drawLibrary(data.library);
}

// eslint-disable-next-line no-unused-vars
function updateLibraryItem(libNum){
    let frmData = document.getElementById("frmLib"+libNum);
    let file = frmData.elements[2].files[0];
    if(file){
        uploadFiles(file, 'library');
        data.library[libNum].location = '/currentScenario/files/library/'+file.name.replace(/ /g, "_");
    }

    data.library[libNum].subject = frmData.elements[0].value;
    data.library[libNum].type = frmData.elements[1].value;

    drawLibrary(data.library);
}

// eslint-disable-next-line no-unused-vars
function deleteLibraryItem(libNum){
    data.library.splice(libNum, 1);
    drawLibrary(data.library);
}

// eslint-disable-next-line no-unused-vars
function cancelEdit(form) {
    $(form).empty();
}

function uploadFiles(file, request) {
    var xhr = new XMLHttpRequest();
    var formData = new FormData();
    xhr.open("POST", "/upload-"+request+"-file", true);
    xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');
    formData.append("upload", file);
    xhr.send(formData);
}

// eslint-disable-next-line no-unused-vars
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