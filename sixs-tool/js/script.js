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

function getChild(dataSnapshot){
  var videoIdIndex = 0;
  var videoIds = new Array();

  dataSnapshot.forEach(
      function(childSnapshot) {
          videoIds[videoIdIndex++] = childSnapshot.key;
      }
  );

  return videoIds;
}

function loadData(){
  var settingsNode = database.ref('settings');
  settingsNode.on('value', function (snapshot) {
    console.log(getChild(snapshot));
  });
  var messageGoalNode = database.ref('settings/messageGoal');
  messageGoalNode.once('value', function (snapshot) {
    document.getElementById('1').innerHTML = snapshot.val();
  });
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
