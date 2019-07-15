var numDays=20;

var startDate = new Date('2019-01-01 00:00:00');
//var endDate = startDate;
//endDate.setDate(endDate.getDate()+numDays);
//endDate.setHours('24');
//endDate.setMinutes();
//endDate.setSeconds();
var endDate = new Date('2019-01-14 24:00:00');

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
  
  
  min: startDate,
  max: endDate,
  
  
  //zoomMin: 9000000,
  margin: {
      item: 10,
      axis: 5
    },
    
    
    
    format: {
        minorLabels: function(date, scale, step) {

            var minorLabel='';
            switch (scale) {
            case 'millisecond':

                break;
            case 'second':

                break;
            case 'minute':
                    var tempDate = new Date(date);
                    minorLabel = ("0" + tempDate.getHours()).slice(-2) + ":" + ("0" + tempDate.getMinutes()).slice(-2);
                break;
            case 'hour':
                var tempDate = new Date(date);
                minorLabel = ("0" + tempDate.getHours()).slice(-2) + ":" + ("0" + tempDate.getMinutes()).slice(-2);
                break;
            case 'day':

                break;
            case 'weekday':
                var res = Math.abs(startDate - date) / 1000;
                var days = Math.floor(res / 86400)+1;
                minorLabel="Day "+days;
                break;
            case 'month':

                break;
            case 'year':

                break;
            default:
                return ("ERROR: minorLabels");
        } 
        return  minorLabel;
     },

        majorLabels: function(date, scale, step) {
            var majorLabel='';
          
            switch (scale) {
            case 'millisecond':

                break;
            case 'second':

                break;
            case 'minute':

                var res = Math.abs(startDate - date) / 1000;
                var days = Math.floor(res / 86400)+1;
                majorLabel="Day "+days;

                break;
            case 'hour':
                
                var res = Math.abs(startDate - date) / 1000;
                var days = Math.floor(res / 86400)+1;
                majorLabel="Day "+days;

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
            return (majorLabel);
        }
    }
    





    // {
    //     minorLabels: {
    //       millisecond:'SSS',
    //       second:     's',
    //       minute:     'HH:mm',
    //       hour:       'HH:mm',
    //       weekday:    'ddd D',
    //       day:        'D',
    //       week:       'w',
    //       month:      'MMM',
    //       year:       'YYYY'
    //     },
    //     majorLabels: {
    //       millisecond:'HH:mm:ss',
    //       second:     'D MMMM HH:mm',
    //       minute:     'ddd D MMMM',
    //       hour:       'ddd D MMMM',
    //       weekday:    'MMMM YYYY',
    //       day:        'MMMM YYYY',
    //       week:       'MMMM YYYY',
    //       month:      'YYYY',
    //       year:       ''
    //     }
    //   }
    
};