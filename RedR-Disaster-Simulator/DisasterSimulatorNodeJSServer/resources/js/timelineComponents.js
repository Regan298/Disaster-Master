var numDays=7;
var startDate = new Date('2019-01-01 00:00:00');
var endDate = new Date('2019-01-01 00:00:00');
endDate.setDate(startDate.getDate()+numDays-1);
endDate.setHours('24');

var groups = [];

var items = []

  var options = {

    editable: false,
    showCurrentTime: true,
    verticalScroll: true,
    maxHeight: window.innerHeight/1.5,
    orientation: 'bottom',
    showMajorLabels: false,
    showMinorLabels: true,
    
    min: startDate,
    //max: endDate,
    
    
    //zoomMin: 9000000,
    //zoomMax: 3000000000,
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
                    var dt2 = new Date(date);
                    var minute = dt2.getMinutes()-startDate.getMinutes();
                    if(minute == 0) {

                        var diff =(dt2.getTime() - startDate.getTime()) / 1000;
                        diff /= (60 * 60);
                        return "0 min\n Day "+ (Math.abs(Math.round(diff))+1);

                    } else {
                        return minute+"min";
                    }
                  break;
              case 'hour':
                  return new Date(date).getMinutes()-startDate.getMinutes() +"min";
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
                    var dt2 = new Date(date);
                    var diff =(dt2.getTime() - startDate.getTime()) / 1000;
                    diff /= (60 * 60);
                    return "Day " + Math.abs(Math.round(diff));
                  break;
              case 'hour':
                    var dt2 = new Date(date);
                    var diff =(dt2.getTime() - startDate.getTime()) / 1000;
                    diff /= (60 * 60);
                    return "Day " + Math.abs(Math.round(diff));
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
