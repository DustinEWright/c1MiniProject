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
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    pixel.setRed(avg);
    pixel.setGreen(avg);
    pixel.setBlue(avg);
  }
  grayImage.drawTo(canvas);
}

function redFilter() {
    for (var pixel of redImage.values()) {
       var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
        if (avg < 128) {
         pixel.setRed(avg * 2);
         pixel.setGreen(0);
         pixel.setBlue(0);
        }
        else {
            pixel.setRed(255);
            pixel.setGreen((avg * 2) - 255);
            pixel.setBlue((avg * 2) - 255);
        }
    }
}



function rainbowFilter() {
  alert("Rainbow Filter Applied.")
}

// Reset & display the original image to the canvas as well as set all images to original.
function resetImage() {
  if (imageIsLoaded(originalImage)) {
    originalImage.drawTo(canvas);
    grayImage = originalImage;
    redImage = originalImage;
    rainbowImage = originalImage;
  }
}

// This is what the grayscale button actually calls.
function doGray() {
  if (imageIsLoaded(grayImage)) {
    grayscaleFiter();
    grayImage.drawTo(canvas);
  }
}

function doRed() {
  if (imageIsLoaded(redImage)) {
    redFilter();
    redImage.drawTo(canvas);
  }
}


/*
function redFilter(image) {
    for (var pixel of image.values()) {
        avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
        if (avg < 128) {
         pixel.setRed(avg * 2);
         pixel.setGreen(0);
         pixel.setBlue(0);
        }
        else {
            pixel.setRed(255);
            pixel.setGreen((avg * 2) - 255);
            pixel.setBlue((avg * 2) - 255);
        }
    }
}


*/