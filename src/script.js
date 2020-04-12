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
