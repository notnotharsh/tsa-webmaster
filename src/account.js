var authName = "notnotharsh";
var authKey = "a57f6f6c-08aa-4ca1-ba65-17c19015734f";

var money = 0;

function store() {
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
  if ((document.getElementById("user").value == null || document.getElementById("user").value == "") || (document.getElementById("pass").value == null || document.getElementById("pass").value == "")) {
    document.getElementsByClassName("home-unit")[0].getElementsByTagName("h3")[0].innerHTML = "Please fill out both the username and password fields!"
  } else {
    var username = document.getElementById("user").value;
    var password = document.getElementById("pass").value;
    var jsonXHR = new XMLHttpRequest();
    jsonXHR.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var fullJSON = JSON.parse(this.responseText);
        console.log(fullJSON);
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
  document.getElementById("carimg").src = "../img/gifs/" + color + car + "Gif.gif"
  var newPurchase = {"car": {"name": car, "color": color, "battery": battery, "autopilot": autopilot}, "price": price};
  return newPurchase;
}

function process() {
  var username = getCookie();
  var purchase = updateInfo();
  var jsonXHR = new XMLHttpRequest();
  jsonXHR.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var fullJSON = JSON.parse(this.responseText);
      var thisUser = fullJSON[username];
      thisUser.money = String(Number(thisUser.money) + purchase.price);
      if (thisUser.car == null) {
        thisUser.car = [purchase.car];
      } else {
        thisUser.car.push(purchase.car);
      }
      fullJSON[username] = thisUser;
      var JSONString = JSON.stringify(fullJSON);
      var postXHR = new XMLHttpRequest();
      postXHR.onreadystatechange = function() {
        if (this.readyState == 4 && (this.status >= 200 && this.status < 300)) {
          shopCookieChecker();
        }
      };
      postXHR.open("POST", "https://jsonbin.org/" + authName + "/lightwave");
      postXHR.setRequestHeader("content-type", "application/json");
      postXHR.setRequestHeader("authorization", "token " + authKey);
      postXHR.send(JSONString);
    }
  };
  jsonXHR.open("GET", "https://jsonbin.org/" + authName + "/lightwave");
  jsonXHR.setRequestHeader("content-type", "application/json");
  jsonXHR.setRequestHeader("authorization", "token " + authKey);
  jsonXHR.send();
}

function getCookie() {
  return document.cookie.split("=")[1];
}

function money() {

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
  var username = getCookie();
  if (username == null || username == "") {
    document.getElementsByClassName("caption")[0].innerHTML = "<h3>Register</h3> <p>Username: <input type=\"text\" id=\"user\" /></p> <p>Password: <input type=\"password\" id=\"pass\" /></p> <button onclick=\"store()\">Submit</button>";
  } else {
    var jsonXHR = new XMLHttpRequest();
    jsonXHR.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var fullJSON = JSON.parse(this.responseText);
        money = Number(fullJSON[username]["money"]);
        var user = getCookie();
        document.getElementsByClassName("caption")[0].innerHTML = "<h3>Success!</h3> <p>You are logged in as " + getCookie() + " and you owe $" + money + ".</p> <button onclick=\"logout()\">Log Out</button>";
      }
    };
    jsonXHR.open("GET", "https://jsonbin.org/" + authName + "/lightwave");
    jsonXHR.setRequestHeader("content-type", "application/json");
    jsonXHR.setRequestHeader("authorization", "token " + authKey);
    jsonXHR.send();
  }
}

function loginCookieChecker() {
  var username = getCookie();
  if (username == null || username == "") {
    document.getElementsByClassName("caption")[0].innerHTML = "<h3>Log In</h3><p>Username: <input type=\"text\" id=\"user\" /></p><p>Password: <input type=\"password\" id=\"pass\" /></p><button onclick=\"validate()\">Submit</button>";
  } else {
    var jsonXHR = new XMLHttpRequest();
    jsonXHR.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var fullJSON = JSON.parse(this.responseText);
        money = Number(fullJSON[username]["money"]);
        var user = getCookie();
        document.getElementsByClassName("caption")[0].innerHTML = "<h3>Success!</h3> <p>You are logged in as " + getCookie() + " and you owe $" + money + ".</p> <button onclick=\"logout()\">Log Out</button>";
      }
    };
    jsonXHR.open("GET", "https://jsonbin.org/" + authName + "/lightwave");
    jsonXHR.setRequestHeader("content-type", "application/json");
    jsonXHR.setRequestHeader("authorization", "token " + authKey);
    jsonXHR.send();
  }
}

function shopCookieChecker() {
  var user = getCookie();
    if (user != null && user != "") {
      document.getElementById("content").innerHTML = "<div class=\"home-unit\"> <img src=\"../img/shop/shop.jpg\" /> <div class=\"caption-wrapper\"> <div class=\"caption\"> <h3>Shop</h3> <p>Scroll down to buy!</p> </div> </div> </div> <div class=\"gen-unit-container\" style=\"min-height: 150px;\"> <div class=\"gen-unit right\"> <img src=\"../img/transparent.png\" class=\"transp\" /> <div style=\"position: absolute; left: calc(50% - 250px)\"> <p></p> <div style=\"float: left;\"> <input type=\"radio\" id=\"Alpine\" name=\"car\" onchange=\"updateInfo()\" checked=\"checked\" />Alpine<br /> <input type=\"radio\" id=\"Boulder\" name=\"car\" onchange=\"updateInfo()\" />Boulder<br /> <input type=\"radio\" id=\"Dune\" name=\"car\" onchange=\"updateInfo()\" />Dune<br /> <input type=\"radio\" id=\"Neptune\" name=\"car\" onchange=\"updateInfo()\" />Neptune<br /> <input type=\"radio\" id=\"Taiga\" name=\"car\" onchange=\"updateInfo()\" />Taiga<br /> </div> <div style=\"float: left;\"> <input type=\"radio\" id=\"baige\" name=\"color\" onchange=\"updateInfo()\" checked=\"checked\" />Beige<br /> <input type=\"radio\" id=\"grey\" name=\"color\" onchange=\"updateInfo()\" />Grey<br /> <input type=\"radio\" id=\"red\" name=\"color\" onchange=\"updateInfo()\" />Red<br /> <input type=\"radio\" id=\"white\" name=\"color\" onchange=\"updateInfo()\" />White<br /> </div> <div style=\"float: left;\"> <input type=\"radio\" id=\"400\" name=\"battery\" onchange=\"updateInfo()\" checked=\"checked\" />400 miles<br /> <input type=\"radio\" id=\"500\" name=\"battery\" onchange=\"updateInfo()\" />500 miles<br /> <input type=\"radio\" id=\"800\" name=\"battery\" onchange=\"updateInfo()\" />800 miles<br /> </div> <div style=\"float: left;\"> <input type=\"checkbox\" id=\"autopilot\" onchange=\"updateInfo()\" />Autopilot<br /> <button id=\"submit\" onclick=\"process()\">Submit</button> </div> </div> </div> </div> <div class=\"gen-bigboi-container\"> <div class=\"gen-bigboi left\"> <img src=\"../img/gifs/baigeAlpineGif.gif\" id=\"shopimg\"/> <p><span class=\"gen-unit-header\">Price: $<span id=\"price\" style=\"margin: 0px;\"></span></span></p> </div> </div>";
    } else {
      document.getElementById("content").innerHTML = "<div class=\"home-unit\"> <img src=\"../img/shop/shop.jpg\" /> <div class=\"caption-wrapper\"> <div class=\"caption\"> <h3>You can't shop unless you're logged in!</h3> <p>You need to be logged in to shop.";
    }
}
