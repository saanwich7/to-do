 
module.exports.Date= date;

function date(){
 var today= new Date();
   var options = { weekday: 'long', day:'numeric',month: 'long',date:'numeric' }
    var current=today.getDay
    var day= today.toLocaleDateString("en-US", options);
    return day
 }