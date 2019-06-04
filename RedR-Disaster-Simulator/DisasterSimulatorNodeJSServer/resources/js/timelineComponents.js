//const socket = io();

var groups = new vis.DataSet([
    {id: 1, content: 'Group 1'},
    {id: 2, content: 'Group 2'},
    {id: 3, content: 'Group 3'},
    {id: 4, content: 'Group 4'}
]);

var testItems = [{
  id: 10,
  group: 1,
  content: 'item 1',
  start: '2019-05-10 04:30:00'
}, {
  id: 20,
  group: 2,
  content: 'item 2',
  start: '2019-05-12 16:30:00'
}, {
  id: 30,
  group: 3,
  content: 'item 3',
  start: '2019-05-15 09:00:00'
}, {
  id: 40,
  group: 4,
  content: 'item 4',
  start: '2019-05-13 12:00:00'
}, {
  id: 50,
  group: 4,
  content: 'item 5',
  start: '2019-05-10 14:00:00'
}]

var items = new vis.DataSet(testItems);

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
