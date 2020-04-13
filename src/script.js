function changeNav() {
  if (getComputedStyle(document.getElementsByTagName("nav")[1]).width == "0px") {
    document.getElementsByTagName("nav")[1].style.width = "250px";
    document.getElementsByTagName("nav")[1].style.paddingLeft = "56px";
    document.getElementById("content").style.pointerEvents = "none";
  } else {
    document.getElementsByTagName("nav")[1].style.width = "0px";
    document.getElementsByTagName("nav")[1].style.paddingLeft = "0px";
    document.getElementById("content").style.pointerEvents = "auto";
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
