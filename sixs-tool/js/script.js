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

function getChild(snapshot){
  var ref = snapshot.ref();

  return ref.child().name();
}

function loadData(){
  var jsonMessageGoal = database.ref('settings');
  console.log(jsonMessageGoal);

  jsonMessageGoal.on('value', function (snapshot) {
    console.log("all child name:" + getChild(snapshot));
  });
  // var jsonMessageGoal = database.ref('settings/messageGoal');
  // jsonMessageGoal.once('value', function (snapshot) {
  //   document.getElementById('1').innerHTML = snapshot;
  // })
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
