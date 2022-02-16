//YOUR FIREBASE LINKS
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


var user_name = localStorage.getItem("user_name");
var room_name = localStorage.getItem("room_name");

function send() {
      msg = document.getElementById("msg").value;
      firebase.database().ref().push({
            name: user_name,
            message: msg,
            like: 0,

      });
      document.getElementById("msg").value = ""
}



function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        //Start code
                        console.log(firebase_message_id);
                        console.log(message_data);
                        name = message_data[' name'];
                        message = message_data['message'];
                        like = message_data['like'];
                        name_with_a_tag = "<h4>" + name + "<img class = 'user_tick' src='tick.png'> </h4>";
                        message_with_a_tag = "<h4 class = 'message_h4'>" + message + "</h4>";
                        like_button = "<button class = 'btn btn-warning' id = " + firebase_message_id + " value = " + like + " onclick = 'updateLike(this.id)' > ";
                        span_with_a_tag = "<span class = 'glyphicon glyphicon-thumbs-up'>LIKE: " + like + "</span> </button> <hr>";
                        row = name_with_a_tag + message_with_a_tag + like_button + span_with_a_tag;
                        document.getElementById("output").innerHTML += row
                        //End code
                  }
            });
      });
}

getData();


function updateLike(message_id) {
      console.log("clicked on like button" + message_id);
      button_id = message_id;
      likes = document.getElementById('button_id').value;
      updated_likes = Number(likes) + 1;
      console.log(updated_likes);
      firebase.database().ref(room_name).child(message_id).update({
            like: updated_likes
      });
}


function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location.replace("index.html");
}
