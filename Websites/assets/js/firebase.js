
// Set the configuration for your app
// TODO: Replace with your project's config object
var config = {
  apiKey: "AIzaSyDwE0vdHYbozevPz921eDwu4hKjKdt4tV0",
  authDomain: "practiceportalforfyp.firebaseapp.com",
  projectId: "practiceportalforfyp",
  storageBucket: "practiceportalforfyp.appspot.com",
  messagingSenderId: "537834025270",
  appId: "1:537834025270:web:6d2c9cb20d0a4f475c0397",
  measurementId: "G-FQGVTJGSGQ"
};

firebase.initializeApp(config);


if (getCookie("userId") == "" && window.location.href.match("Login.html") == null){
  window.location.href = "./Login.html"
}

// Deals with the Cookie
  function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        if(c == "userId=undefined"){
          return ""
        }
        return c.substring(name.length, c.length);
        console.log(i);
      }
    }
    return "";
  }

// 

// Normal Login To sign in Function
  function changeState(active, closer) {
    document.getElementById(active).style.display = "block";
    document.getElementById(closer).style.display = "none";
  }

// Login to the portal
  function Login() {
    var email = document.getElementById("email_lg").value
    var password = document.getElementById("password_lg").value
    if (email == "")
      alert("Enter Email ...")
    else if (password == "")
      alert("Enter Passwords ...")
    else {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in
          
          var user = userCredential.user.uid;
          setCookie("userId",user,1);
          window.location.href = "./index.html";

        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
        });
    }
  }

// Sign to the portal
  function Signup() {
    var email = document.getElementById("email_sg").value
    var password = document.getElementById("password_sg").value

    var name = document.getElementById("name_sg").value;


    if (email.length < 4) {
      alert('Please enter an email address.');
      return;
    }
    if (password.length < 4) {
      alert('Please enter a password.');
      return;
    }
    // Create user with email and pass.
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in 
        var user = userCredential.user.uid;
        setCookie("userId",user,1);
        var obj = {"name": name, "Email": email, "Passwords": password, "Task list": {},
          "Task Done": 0, Timing: (new Date()), "Rating": 0, "Last Submit": (new Date())};

        writeData(("users/"+user), obj);
        window.location.href = "./index.html";

        // ...
      }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
  }
// Database read write function
  // Write any thing to the database
  function writeData(Head, details) {
    firebase.database().ref(Head).set({ details });
  }

  // Get any thing to the database
  function getDataFromFB(params) {
    var getvalue = firebase.database().ref(params);
    getvalue.on('value', function(snapshot) {
      const data = snapshot.val();
      return data;
    });
  }


  function CheckTask(){

    var getvalue = firebase.database().ref("Running/");
    getvalue.on('value', function(snapshot) {
      const data = snapshot.val();
      const taskDeadline = new Date(data["details"]["deadLine"]);
      
      if(taskDeadline == undefined)
       nextQuestion();

      if(taskDeadline <= (new Date()))
        nextQuestion();
      else if(data != undefined)
        setScreen(data);
    });
  }

  
  function setScreen(data){
    console.log(data)
    if(data == null)
      data = {};
      
      data = data["details"];
      
      document.getElementById("Task").value = data["Task"];
      document.getElementById("Language").value = data["Language"];
      document.getElementById("Paragraph").value = data["detail"];
      
    initializeClock('clockdiv', data["deadLine"]);
    
    getUserList()
  }


function getUserList(){
  var getvalue = firebase.database().ref("users/");
  getvalue.on('value', function(snapshot) {
    const UserList = snapshot.val();
    // var UserList = getDataFromFB("/");
    if(UserList == undefined)
    UserList = [];
    

    var template = `
    <div class="container-fluid">
    <div class="row"><div class="col"><div class="card shadow"><div class="card-body"><div class="table-responsive table mb-0 pt-3 pr-2"><table class="table table-striped table-sm my-0 mydatatable"><thead><tr><th><strong>Name</strong></th><th><strong>Timing</strong><br></th><th><strong>Rating</strong><br></th><th><strong>No of Task</strong></th><th><strong>Last Task</strong></th><th></th></tr></thead><tbody id="userList">`;

    for (const key in UserList) {
      if (Object.hasOwnProperty.call(UserList, key)) {
        const element = UserList[key]["details"];
        
        template += `
      <tr>
      <td>${element.name}</td>
      <td>${element["Timing"]}</td>
      <td>${element["Rating"]}</td>
      <td>${element["Task Done"]}</td>
      <td>${element["Last Submit"]}</td>

      ${key == getCookie("userId") ? 
      `<td class="dropdownTab" onclick=""><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" onClick="window.location.href='./Details.html'">
      <path d="M2 8C2 7.44772 2.44772 7 3 7H21C21.5523 7 22 7.44772 22 8C22 8.55228 21.5523 9 21 9H3C2.44772 9 2 8.55228 2 8Z" fill="currentColor"></path>
      <path d="M2 12C2 11.4477 2.44772 11 3 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H3C2.44772 13 2 12.5523 2 12Z" fill="currentColor"></path>
      <path d="M3 15C2.44772 15 2 15.4477 2 16C2 16.5523 2.44772 17 3 17H15C15.5523 17 16 16.5523 16 16C16 15.4477 15.5523 15 15 15H3Z" fill="currentColor"></path>
      </svg></td>
      ` : "<td class=''><td>"} </tr>`;
    }

  }
  template += `</tbody></table></div></div></div></div></div></div>`;

  // document.getElementsByTagName("table").item(template)

  document.getElementById("userTable").innerHTML = template;
  });
}

function gettaskDoneList(){
    uid = getCookie("userId");

    var getvalue = firebase.database().ref("users/"+uid+"/details/taskList/");
    getvalue.on('value', function(snapshot) {
      const taskList = snapshot.val();

    // var taskList = getDataFromFB("users/"+uid+"/details/taskList/")
    if(taskList == undefined)
      taskList = [];

      const template = "";
      for (let i = 0; i < taskList.length; i++) {
        const element = taskList[i]["details"];
        template = `<tr>
          <td><a href="${element["link"]}">Task ${i+1}<br></a></td>
          <td>${element["Time"]}</td>

          
          <td>
            ${getStarCount(element["Rating"])}
          </td>

          <td style="width: 5%;">${element["Rating"] == "0" && isAdmin()? 
            '<input type="text">':
            '<button onClick="window.location.href('+element["link"]+')">Goto</button>'

          }</td>
        </tr>`;
        

        document.getElementById("TaskList").innerHTML = template;
      }
    });
}

function isAdmin(){
  return (getDataFromFB("Admin List/details/"+uid) == "true");
}

function getStarCount(runOn){
  var starString = "";

  for (let i = 0; i < parseInt(runOn); i++) {
    starString += '<i class="fa fa-star Icon"></i>';
  }

  if(runOn.match(".5"))
    starString += '<i class="fa fa-star-half Icon"></i>';
  
  return starString;
}

function SubmitWork() {
  var input = document.getElementById("Turn it").value;
  var date = new Date();
  var Rating = 0;
  var TaskNumber = getDataFromFB("users/"+uid+"/details/Task Done");

  var obj = {"link": input, "Time":date, "Rating":Rating}

  writeData("users/"+uid+"/details/"+TaskNumber, obj);
}


// Forget Password
  function sendPasswordReset() {
    var email = document.getElementById('email').value;

    firebase.auth().sendPasswordResetEmail(email).then(function () {
      // Password Reset Email Sent!
      alert('Password Reset Email Sent!');
    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/invalid-email') {
        alert(errorMessage);
      } else if (errorCode == 'auth/user-not-found') {
        alert(errorMessage);
      } else {
        console.log(error);
      }
    });
  }



// setQuestion();

// function setQuestion() {
//   // fetch("Db\\Sample.json")
//   // .then(response => response.json())
//   // .then(json => {
    
//   //   Question = json.Questions[0]
//   //   console.log(Question)
  
//   //   for (const key in Question) {
//   //     if (Object.hasOwnProperty.call(Question, key)) {
//   //       const element = Question[key];
//   //       writeData(("Questions/"+key),element)
//   //     }
//   //   }
  
//   // });



//   // var lst = ["React","React native", "Flutter", "Pure js", "C language", "C++", "PHP", "C#", "MVC", "Java"];

//   // let index = 0
//   // for (index;  index < lst.length; index++) {
//   //   const element = lst[index];
//   //   writeData(("Languages/"+(index+1)),element);
//   // }

//   // writeData(("Languages/Total"),(index));

// }



