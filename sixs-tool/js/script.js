const config = {
  apiKey: "AIzaSyCTQXsEEM6WJQCdHmWAdoRR_jPxcGprrkg",
  authDomain: "busuck-18a9a.firebaseapp.com",
  databaseURL: "https://busuck-18a9a.firebaseio.com",
  projectId: "busuck-18a9a",
  storageBucket: "busuck-18a9a.appspot.com",
  messagingSenderId: "466654786519"
};

firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

window.onload = function() {
  loadData();
};

function timeDifference(date1,date2) {
  var difference = date1.getTime() - date2.getTime();

  var daysDifference = Math.floor(difference/1000/60/60/24);
  difference -= daysDifference*1000*60*60*24

  var hoursDifference = Math.floor(difference/1000/60/60);
  // difference -= hoursDifference*1000*60*60

  // var minutesDifference = Math.floor(difference/1000/60);
  // difference -= minutesDifference*1000*60

  // var secondsDifference = Math.floor(difference/1000);

  return daysDifference, hoursDifference;
}

function getChild(dataSnapshot){
  var childIdIndex = 0;
  var childIds = new Array();

  dataSnapshot.forEach(
      function(childSnapshot) {
          childIds[childIdIndex++] = childSnapshot.key;
      }
  );

  return childIds;
}

function checkCount1(messages){
  var status = false;
  var messagesIdsNode = database.ref('chats/' + sessions[i] + '/messages/' + messages + '/timestamp');
  messagesIdsNode.once('value').then(function (snapshot) {
    var now = new Date();
    var date = new Date(snapshot.val());
    var days, hours = timeDifference(now, date);
    if (days < 1 && hours < 24) {
      status = true;
    } 
    else {
      status = false;
    }
  });

  return status;
}

function loadData(){
  var count_1  = 0;
  var count_2 = 0;
  var count_3 = 0;
  var count_4 = 0;
  var count_5 = 0;
  var sessions = new Array();

  var chatsNode = database.ref('chats');

  chatsNode.on('value', function (snapshot) {
    sessions = getChild(snapshot);
    while( sessions[0][0] == '+'){
      sessions.splice(0,1);
    }
    count_3 = sessions.length;
    document.getElementById('3').innerHTML = count_3;
  });

  for (var i = 0; i < sessions.length; i++) {
    var sessionsNode = database.ref('chats/'+ sessions[i]);
    sessionsNode.on('value').then(function (snapshot) {
      var checkMess = snapshot.child('messages').exists();
      if(checkMess){
        var messagesNode = database.ref('chats/' + sessions[i] + '/messages');
        messagesNode.on('value').then(function (snapshot) {
          var messagesIds = getChild(snapshot);
          if (messagesIds.length > 33) {
            count_4++;
            count_2 += messagesIds.length - 33;
          }
          for (var i = 0; i < messagesIds.length; i++) {
            var status = checkCount1(messagesIds[i]);
            if (status) {
              count_1++;
            }
          }
        });
      }
    });
  }
  document.getElementById('1').innerHTML = count_1;
  document.getElementById('2').innerHTML = count_2;
  document.getElementById('4').innerHTML = count_4;
  document.getElementById('5').innerHTML = count_3 - count_4;

}


// $(document).ready(function() {
//   // sample
//   getMessageGoal(document);
// });

// // sample of how to get data from DB
// const getMessageGoal = document => {
//   firebase.database().ref('settings/messageGoal').once('value', snapshot => {
//     document.getElementById('1').innerHTML = snapshot.val();
//   })
// }
