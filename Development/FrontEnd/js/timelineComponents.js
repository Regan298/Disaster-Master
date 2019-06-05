var groups = new vis.DataSet([
    {id: 1, content: 'Group 1'},
    {id: 2, content: 'Group 2'},
    {id: 3, content: 'Group 3'},
    {id: 4, content: 'Group 4'}
]);

var items = new vis.DataSet([{
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
  min: new Date('2019-01-01 00:00:00'),
  max: new Date('2019-01-05 24:00:00'),
  zoomMin: 9000000,
  margin: {
      item: 10,
      axis: 5
    },
    
    
    
    
    
    
    
    
    
    format: {
      //minorLabels: function(date, scale, step) {
        //var now = new Date();
        //var ago = now - date;
        //var divider;
        //switch (scale) {
         // case 'millisecond':
         //   divider = 1;
         //   break;
         // case 'second':
         //   divider = 1000;
          //  break;
          //case 'minute':
          //  divider = 1000 * 60;
          //  break;
          //case 'hour':
          //  divider = 1000 * 60 * 60;
          //  break;
          //case 'day':
          //  divider = 1000 * 60 * 60 * 24;
          //  break;
          //case 'weekday':
          //  divider = 1000 * 60 * 60 * 24 * 7;
          //  break;
          //case 'month':
           // divider = 1000 * 60 * 60 * 24 * 30;
          //  break;
          //case 'year':
           // divider = 1000 * 60 * 60 * 24 * 365;
          //  break;
         // default:
        //    return new Date(date);
       // } 
       // return  (Math.round(ago * step / divider)) + " " + scale + "s ago" 
     // },
        majorLabels: function(date, scale, step) {
            var label="";
          
            switch (scale) {
            case 'millisecond':

                break;
            case 'second':

                break;
            case 'minute':
                label="Day x";
                break;
            case 'hour':
                label="Day x";
                break;
            case 'day':
                
                break;
            case 'weekday':
                
                break;
            case 'month':

                break;
            case 'year':

                break;
            default:
                return ("ERROR: majorLabels");
            }
            return (label);
        }
    }
    
    //  majorLabels: {
    //millisecond:'HH:mm:ss',
    //second:     'D MMMM HH:mm',
    //minute:     'ddd D MMMM',
    //hour:       'ddd D MMMM',
    //weekday:    'MMMM YYYY',
    //day:        'MMMM YYYY',
    //week:       'MMMM YYYY',
    //month:      'YYYY',
    //year:       ''
  //}
//}
    
};

//redraw()
//getSelection()
