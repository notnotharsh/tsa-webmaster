function changeNav() {
  if (getComputedStyle(document.getElementsByTagName("nav")[1]).width == "0px") {
    document.getElementsByTagName("nav")[1].style.width = "250px";
  } else {
    document.getElementsByTagName("nav")[1].style.width = "0px";
  }
}
