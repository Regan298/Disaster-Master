function tableToXML() {
    var xml = "<scenario>\n";
    var tritem = document.getElementById("result").getElementsByTagName("tr");
    for (i = 0; i < tritem.length; i++) {
        var celldata = tritem[i];
        if (celldata.cells.length > 0) {
            xml += "<time>" + celldata.cells[0].textContent + "</time>\n";
            xml += "<event>" + celldata.cells[1].textContent + "</event>\n";
            xml += "<remarks>" + celldata.cells[2].textContent + "</remarks>\n";
        }
    }
    xml += "</scenario>";
    //window.alert(xml);
    
    var blob = new Blob([xml], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "xml.xml");
    
}

function save() {
    var blob = new Blob(["Hello world"], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "hello world.txt");
}

function load() {
    //document.getElementById('output').innerHTML = "Load Successful!";
}