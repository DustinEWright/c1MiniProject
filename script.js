// Global Variables
var canvas = null;
var originalImage = null;
var grayImage = null;
/* global SimpleImage */

// Load the original image:
function loadImage() {
  var fileinput = document.getElementById("OEM-Image");
  originalImage = new SimpleImage(fileinput);
  grayImage = new SimpleImage(fileinput);
  canvas = document.getElementById("can");
  originalImage.drawTo(canvas);
}

// Filter Effects:
function grayscaleFiter() {
  alert("Grayscale Filter Applied.")
}

function redFilter() {
  alert("Red Filter Applied.")
}

function rainbowFilter() {
  alert("Rainbow Filter Applied.")
}

// Reset the image back to the original version
function resetImage() {
  alert("Image Reset To Original.");
}