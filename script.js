// Global Variables
var originalImage = null;
var grayImage = null;
var redImage = null;
var rainbowImage = null;
var canvas = null;
/* global SimpleImage */

// Load the original image:
function loadImage() {
  var fileinput = document.getElementById("OEM-Image");
  originalImage = new SimpleImage(fileinput);
  grayImage = new SimpleImage(fileinput);
  canvas = document.getElementById("can");
  originalImage.drawTo(canvas);
}

// Checks if the image is loaded & ready.
function imageIsLoaded(image) {
  if (image != null && image.complete()) {
    return true;
  }
  else {
    alert("Image is not loaded.");
  }
}

// Filter Effects:
function grayscaleFiter() {
  for (var pixel of grayImage.values()) {
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) /3;
    pixel.setRed(avg);
    pixel.setGreen(avg);
    pixel.setBlue(avg);
  }
  grayImage.drawTo(canvas);
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

// This is what the grayscale button actually calls.
function doGray() {
  if (imageIsLoaded(grayImage)) {
    grayscaleFiter();
    grayImage.drawTo(canvas);
  }
}

