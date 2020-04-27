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
  if ((document.getElementById("user").value == null || document.getElementById("user").value == "") || (document.getElementById("pass").value == null || document.getElementById("pass").value == "")) {
    document.getElementsByClassName("home-unit")[0].getElementsByTagName("h3")[0].innerHTML = "Please fill out both the username and password fields!"
  } else {
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
}

function validate() {
  getCredentials();
  if ((document.getElementById("user").value == null || document.getElementById("user").value == "") || (document.getElementById("pass").value == null || document.getElementById("pass").value == "")) {
    document.getElementsByClassName("home-unit")[0].getElementsByTagName("h3")[0].innerHTML = "Please fill out both the username and password fields!"
  } else {
    var username = document.getElementById("user").value;
    var password = document.getElementById("pass").value;
    var jsonXHR = new XMLHttpRequest();
    jsonXHR.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var fullJSON = JSON.parse(this.responseText);
        var names = Object.keys(fullJSON);
        if (names.includes(username) && fullJSON[username]["password"] == password) {
          var d = new Date();
          d.setTime(d.getTime() + (36524 * 24 * 60 * 60 * 1000));
          var expires = ";expires=" + d.toUTCString();
          document.cookie = "username=" + username + expires + ";path=/";
          loginCookieChecker();
        } else {
          document.getElementsByClassName("home-unit")[0].getElementsByTagName("h3")[0].innerHTML = "Sorry, that username-password combination doesn't seem to exist."
        }
      }
    };
    jsonXHR.open("GET", "https://jsonbin.org/" + authName + "/lightwave");
    jsonXHR.setRequestHeader("content-type", "application/json");
    jsonXHR.setRequestHeader("authorization", "token " + authKey);
    jsonXHR.send();
  }
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

function updateInfo() {
  var carPrices = [29500, 87500, 26500, 97500, 27500];
  var batteryPrices = [18000, 22500, 36000];
  var price = 0;
  var car;
  var color;
  var battery;
  var autopilot;
  var options = document.getElementsByTagName("input");
  for (var i = 0; i < 5; i++) {
    if (options[i].checked == true) {
      car = options[i].id;
      price += carPrices[i];
    }
  }
  for (var i = 5; i < 9; i++) {
    if (options[i].checked == true) {
      color = options[i].id;
    }
  }
  for (var i = 9; i < 12; i++) {
    if (options[i].checked == true) {
      battery = options[i].id;
      price += batteryPrices[i - 9];
    }
  }
  if (options[12].checked == true) {
    price += 5000;
  }
  document.getElementById("price").innerHTML = price;
  document.getElementsByClassName("gen-bigboi")[0].getElementsByTagName("img")[0].src = "../img/gifs/" + color + car + "Gif.gif" 
}

function getCookie() {
  return document.cookie.split("=")[1];
}

function logout() {
  document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  if (location.href.includes("register.html")) {
    registerCookieChecker();
  } else if (location.href.includes("login.html")) {
    loginCookieChecker();
  }
}

function registerCookieChecker() {
  var user = getCookie();
    if (user != null && user != "") {
      document.getElementsByClassName("caption")[0].innerHTML = "<h3>Success!</h3> <p>You are logged in as " + getCookie() + ".</p> <button onclick=\"logout()\">Log Out</button>";
    } else {
      document.getElementsByClassName("caption")[0].innerHTML = "<h3>Register</h3> <p>Username: <input type=\"text\" id=\"user\" /></p> <p>Password: <input type=\"password\" id=\"pass\" /></p> <button onclick=\"store()\">Submit</button>";
    }
}

function loginCookieChecker() {
  var user = getCookie();
    if (user != null && user != "") {
      document.getElementsByClassName("caption")[0].innerHTML = "<h3>Success!</h3> <p>You are logged in as " + getCookie() + ".</p> <button onclick=\"logout()\">Log Out</button>";
    } else {
      document.getElementsByClassName("caption")[0].innerHTML = "<h3>Log In</h3><p>Username: <input type=\"text\" id=\"user\" /></p><p>Password: <input type=\"password\" id=\"pass\" /></p><button onclick=\"validate()\">Submit</button>";
    }
}
