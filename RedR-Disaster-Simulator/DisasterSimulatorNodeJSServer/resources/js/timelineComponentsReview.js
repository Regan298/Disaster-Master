var numDays=7;
var startDate = new Date('2019-01-01 00:00:00');
var endDate = new Date('2019-01-01 00:00:00');
endDate.setDate(startDate.getDate()+numDays-1);
endDate.setHours('24');

//var groups = [];

//var items = []
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
  start: '2019-01-03 00:00:00'
}]);



var options = {

  editable: false,
  showCurrentTime: false,
  verticalScroll: true,
  maxHeight: window.innerHeight/1.5,
  orientation: 'bottom',
  
  
  min: startDate,
  max: endDate,
  
  
  zoomMin: 9000000,
  zoomMax: 3000000000,
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
                var res = Math.abs(startDate - date) / 1000;
                var days = Math.floor(res / 86400)+1;
                minorLabel="Day "+days;
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
};
