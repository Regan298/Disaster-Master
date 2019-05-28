var groups = new vis.DataSet([
    {id: 1, content: 'Group 1'},
    {id: 2, content: 'Group 2'},
    {id: 3, content: 'Group 3'},
    {id: 4, content: 'Group 4'}
]);

var items = new vis.DataSet([{
  id: 1,
  group: 1,
  content: 'item 1',
  start: '2019-05-10'
}, {
  id: 2,
  group: 2,
  content: 'item 2',
  start: '2019-05-12'
}, {
  id: 3,
  group: 3,
  content: 'item 3',
  start: '2019-05-15'
}, {
  id: 4,
  group: 4,
  content: 'item 4',
  start: '2019-05-13 09:00:00'
}, {
  id: 5,
  group: 4,
  content: 'item 5',
  start: '2019-05-10 14:00:00'
}]);

var timelineHeight = window.innerHeight/1.5;
// Config for Timeline
var options = {
  editable: false,
  
  //for making timeline scrollable
  verticalScroll: true,
  maxHeight: timelineHeight,
  
  orientation: 'bottom',
  min: new Date('2019-05-10 00:00:00'),
  max: new Date('2019-05-15 24:00:00'),
  zoomMin: 1000 * 4 * 60 * 24 * 7,
  margin: {
      item: 10,
      axis: 5
    }
};

//redraw()
//getSelection()
