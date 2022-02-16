
//ADD YOUR FIREBACE LINKS HERE
var firebaseConfig = {
      apiKey: "AIzaSyDp9fRIOFEQDC5yURNEj-c0vmvstP9npf8",
      authDomain: "class93-2ec4a.firebaseapp.com",
      databaseURL: "https://class93-2ec4a-default-rtdb.firebaseio.com",
      projectId: "class93-2ec4a",
      storageBucket: "class93-2ec4a.appspot.com",
      messagingSenderId: "986165209512",
      appId: "1:986165209512:web:d453f086c8f572fd2a959d"
};

firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name")

document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";

function addRoom() {
      room_name = document.getElementById("room_name").value;
      firebase.database().ref("/").child(room_name).update({
            purpose: "adding room name"
      });

      localStorage.setItem("room_name", room_name);
      window.location = "kwitter_page.html";
}



function getData() {

      firebase.database().ref("/").on('value', function (snapshot) {

            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {

                  childKey = childSnapshot.key;

                  Room_names = childKey;
                  //Start code
                  console.log("room_name" + Room_names);
                  row = "<div class='room_name'id=" + Room_names + "onclick='redirectToRoomName(this.id)'>" + Room_names + "</div> <hr> <hr>";
                  document.getElementById("output").innerHTML += row;
                  //End code
            });
      });
}
getData();


function redirectToRoomName(name) {
      console.log(name);
      localStorage.setItem("room_name", name);
      window.location = "kwitter_page.html"
}

function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location.replace("index.html");
}


