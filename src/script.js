function changeNav() {
  if (getComputedStyle(document.getElementsByTagName("nav")[1]).width == "0px") {
    document.getElementsByTagName("nav")[1].style.width = "150px";
    document.getElementsByTagName("nav")[1].style.paddingLeft = "50px";
    document.getElementById("content").style.pointerEvents = "none";
  } else {
    document.getElementsByTagName("nav")[1].style.width = "0px";
    document.getElementsByTagName("nav")[1].style.paddingLeft = "0px";
    document.getElementById("slide").style.left = "0px";
    document.getElementById("slide").style.width = "0px";
    document.getElementById("slide").innerHTML = "";
    document.getElementById("content").style.pointerEvents = "auto";
  }
}

function orderNav() {
  if (getComputedStyle(document.getElementsByClassName("right")[0]).float == "left") {
    document.getElementsByTagName("nav")[0].innerHTML = "<a href =\"vehicles/\" class=\"left dropdowner\" onmouseover=\"dropdown(0)\">Vehicles</a> <a href =\"charging/\" class=\"left dropdowner\" onmouseover=\"dropdown(1)\">Charging</a> <a href=\"mission/\" class=\"left\">Mission</a> <a href=\"news/\" class=\"left\">News</a> <a href=\"shop/\" class=\"right\">Shop</a> <a href=\"account/login.html\" class=\"right\">Log In</a> <a href=\"account/register.html\" class=\"right\">Register</a> <div class=\"dropdown forzero\"> <a href=\"vehicles/alpine.html\">Alpine</a> <a href=\"vehicles/boulder.html\">Boulder</a> <a href=\"vehicles/dune.html\">Dune</a> <a href=\"vehicles/neptune.html\">Neptune</a> <a href=\"vehicles/taiga.html\">Taiga</a> </div> <div class=\"dropdown forone\"> <a href=\"charging/chargers.html\">Chargers</a> <a href=\"charging/map.html\">Map</a> </div>";
  } else {
    document.getElementsByTagName("nav")[0].innerHTML = "<a href =\"vehicles/\" class=\"left dropdowner\" onmouseover=\"dropdown(0)\">Vehicles</a> <a href =\"charging/\" class=\"left dropdowner\" onmouseover=\"dropdown(1)\">Charging</a> <a href=\"mission/\" class=\"left\">Mission</a> <a href=\"news/\" class=\"left\">News</a> <a href=\"account/register.html\" class=\"right\">Register</a> <a href=\"account/login.html\" class=\"right\">Log In</a> <a href=\"shop/\" class=\"right\">Shop</a> <div class=\"dropdown forzero\"> <a href=\"vehicles/alpine.html\">Alpine</a> <a href=\"vehicles/boulder.html\">Boulder</a> <a href=\"vehicles/dune.html\">Dune</a> <a href=\"vehicles/neptune.html\">Neptune</a> <a href=\"vehicles/taiga.html\">Taiga</a> </div> <div class=\"dropdown forone\"> <a href=\"charging/chargers.html\">Chargers</a> <a href=\"charging/map.html\">Map</a> </div>";
  }
}

function dropdown(index) {
  var theDropdown = document.getElementsByClassName("dropdown")[index];
  if (getComputedStyle(theDropdown).height == "0px") {
    var height = (32 * theDropdown.childElementCount + 4) + "px";
    theDropdown.style.height = height;
    document.getElementById("content").style.pointerEvents = "none";
    if (index == 0) {
      document.addEventListener("mousemove", mousedOuttaZero);
    } else if (index == 1) {
      document.addEventListener("mousemove", mousedOuttaOne);
    }
  } else {
    var height = "0px";
    theDropdown.style.height = height;
    document.getElementById("content").style.pointerEvents = "auto";
    if (index == 0) {
      document.removeEventListener("mousemove", mousedOuttaZero);
    } else if (index == 1) {
      document.removeEventListener("mousemove", mousedOuttaOne);
    }
  }
}

function mousedOutta(event, index) {
  var theDropdown = document.getElementsByClassName("dropdown")[index];
  var style = getComputedStyle(theDropdown);
  var xMin = Number(style.left.replace("px", ""));
  var xMax = Number(style.left.replace("px", "")) + Number(style.width.replace("px", ""));
  var yMin = 22;
  var yMax = 32 * theDropdown.childElementCount + 66;
  var mouseX = event.clientX;
  var mouseY = event.clientY;
  if (!(((mouseX > xMin) && (mouseY > yMin)) && ((mouseX < xMax) && (mouseY < yMax)))) {
    dropdown(index);
  }
}

function mousedOuttaZero(event) {
  mousedOutta(event, 0);
}

function mousedOuttaOne(event) {
  mousedOutta(event, 1);
}

function slideNav(index) {
  var images = document.getElementsByTagName("nav")[1].getElementsByTagName("img");
  if ((getComputedStyle(document.getElementById("slide")).width == "0px") || (document.getElementsByTagName("nav")[1].getElementsByTagName("img")[index].src.endsWith("img/right.png"))) {
    for (var i = 0; i < images.length; i++) {
      images[i].src = document.getElementsByTagName("nav")[1].id + "/img/right.png";
    }
    document.getElementsByTagName("nav")[1].getElementsByTagName("img")[index].src = document.getElementsByTagName("nav")[1].id + "/img/left.png";
    document.getElementById("slide").style.left = "200px";
    document.getElementById("slide").style.width = "100px";
    document.getElementById("slide").innerHTML = document.getElementsByTagName("nav")[0].getElementsByClassName("dropdown")[index].innerHTML;
  } else {
    for (var i = 0; i < images.length; i++) {
      images[i].src = document.getElementsByTagName("nav")[1].id + "/img/right.png";
    }
    document.getElementById("slide").style.width = "0px";
    document.getElementById("slide").style.left = "0px";
    document.getElementById("slide").innerHTML = "";
  }
}

function homeImages() {
  var units = document.getElementsByClassName("home-unit");
  for (var i = 0; i < units.length; i++) {
    var source = units[i].getElementsByTagName("img")[0].src;
    units[i].style.backgroundImage = "url(\"" + source + "\")";
  }
}

function genText() {
  var units = document.getElementsByClassName("gen-unit");
  if (innerWidth > 720) {
    for (var i = 0; i < units.length; i++) {
      var width = getComputedStyle(units[i]).width;
      var height = getComputedStyle(units[i]).height;
      var textHeight = getComputedStyle(units[i].getElementsByTagName("p")[0]).height;
      var imgWidth = getComputedStyle(units[i].getElementsByTagName("img")[0]).width;
      units[i].getElementsByTagName("p")[0].style.width = String((Number(width.replace("px", "")) - Number(imgWidth.replace("px", "")) - 100) + "px");
      units[i].getElementsByTagName("p")[0].style.top = String((Number(height.replace("px", "")) / 2 - Number(textHeight.replace("px", "")) * 16 / 19 - 8) + "px");
    }
  } else {
    for (var i = 0; i < units.length; i++) {
      units[i].getElementsByTagName("p")[0].style = "";
    }
  }
}
