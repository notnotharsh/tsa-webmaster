var authName = "notnotharsh";
var authKey = "a57f6f6c-08aa-4ca1-ba65-17c19015734f";

function getCredentials() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && (this.status == 200 || this.status == 0)) {
      if (this.responseText != "") {
        var authData = JSON.parse(this.responseText);
        authName = authData.name;
        authKey = authData.apikey;
      }
    }
  };
  xhttp.open("GET", "config.json", true);
  xhttp.send();
}

function store() {
  getCredentials();
  var username = document.getElementById("user").value;
  var password = document.getElementById("pass").value;
  var jsonXHR = new XMLHttpRequest();
  jsonXHR.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var fullJSON = JSON.parse(this.responseText);
      var names = Object.keys(fullJSON);
      if (names.includes(username)) {
        document.getElementsByClassName("home-unit")[0].getElementsByTagName("h3")[0].innerHTML = "Sorry, that username is either invalid or taken."
      } else {
        newUser(username, password, fullJSON);
      }
    }
  };
  jsonXHR.open("GET", "https://jsonbin.org/" + authName + "/lightwave");
  jsonXHR.setRequestHeader("content-type", "application/json");
  jsonXHR.setRequestHeader("authorization", "token " + authKey);
  jsonXHR.send();
}

function newUser(username, password, fullJSON) {
  var d = new Date();
  d.setTime(d.getTime() + (36524 * 24 * 60 * 60 * 1000));
  var expires = ";expires=" + d.toUTCString();
  document.cookie = "username=" + username + expires + ";path=/";
  var newUser = {"password": password, "money": "0", "cars": []};
  fullJSON[username] = newUser;
  var JSONString = JSON.stringify(fullJSON);
  var postXHR = new XMLHttpRequest();
  postXHR.onreadystatechange = function() {
    if (this.readyState == 4 && (this.status >= 200 && this.status < 300)) {
      registerCookieChecker();
    }
  };
  postXHR.open("POST", "https://jsonbin.org/" + authName + "/lightwave");
  postXHR.setRequestHeader("content-type", "application/json");
  postXHR.setRequestHeader("authorization", "token " + authKey);
  postXHR.send(JSONString);
}


function getCookie() {
  return document.cookie.split("=")[1];
}

function logout() {
  document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  if (location.href.includes("register.html")) {
    registerCookieChecker();
  }
}

function registerCookieChecker() {
  var user = getCookie();
    if (user != null && user != "") {
      document.getElementsByClassName("caption")[0].innerHTML = "<h3>Registered!</h3> <p>You are logged in as " + getCookie() + ".</p> <button onclick=\"logout()\">Log out</button>";
    } else {
      document.getElementsByClassName("caption")[0].innerHTML = "<h3>Register</h3> <p>Username: <input type=\"text\" id=\"user\" /></p> <p>Password: <input type=\"password\" id=\"pass\" /></p> <button onclick=\"store()\">Submit</button>";
    }
}
