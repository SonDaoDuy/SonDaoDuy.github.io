const config = {
  apiKey: "AIzaSyCTQXsEEM6WJQCdHmWAdoRR_jPxcGprrkg",
  authDomain: "busuck-18a9a.firebaseapp.com",
  databaseURL: "https://busuck-18a9a.firebaseio.com",
  projectId: "busuck-18a9a",
  storageBucket: "busuck-18a9a.appspot.com",
  messagingSenderId: "466654786519"
};

firebase.initializeApp(config);

$(document).ready(function() {
  // sample
  getMessageGoal(document);
});

// sample of how to get data from DB
const getMessageGoal = document => {
  firebase.database().ref('settings/messageGoal').once('value', snapshot => {
    document.getElementById('1').innerHTML = snapshot.val();
  })
}
