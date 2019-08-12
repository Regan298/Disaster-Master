
function onSelect(properties){
    console.log(items);
    console.log(properties.items[0]);
    console.log(items[properties.items[0]].location);
    PDFObject.embed(items[properties.items[0]].location, "#overlayPdf");
    document.getElementById("eventOverlay").style.display = "block";
}

if(!initDraw){
    timeline.on('select', onSelect);
}

