// Global Variables
var canvas = document.getElementById("can");
var originalImage = null;
var grayImage = null;
var fileinput = document.getElementById("OEM-Image");
/* global SimpleImage */

// Load the original image:
function loadImage() {
  originalImage = new SimpleImage(fileinput);
  grayImage = new SimpleImage(fileinput);
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