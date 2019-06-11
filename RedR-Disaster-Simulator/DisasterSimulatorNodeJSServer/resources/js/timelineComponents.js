//const socket = io();

var groups = new vis.DataSet([
    {id: 1, content: 'Group 1'},
    {id: 2, content: 'Group 2'},
    {id: 3, content: 'Group 3'},
    {id: 4, content: 'Group 4'}
]);

var items = []

//var items = new vis.DataSet(events);

var timelineHeight = window.innerHeight/1.5;
// Config for Timeline
var options = {
  editable: false,
  
  //for making timeline scrollable
  verticalScroll: true,
  maxHeight: timelineHeight,
  
  orientation: 'bottom',
  //(d.getFullYear() + "/" + (d.getMonth()+1)  + "/" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds())
  min: new Date('2019-05-10 00:00:00'),
  max: new Date('2019-05-15 24:00:00'),
  zoomMin: 60000,
  margin: {
      item: 10,
      axis: 5
    }
};





//redraw()
//getSelection()
