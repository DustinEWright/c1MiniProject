"use strict"; // MGP: https://www.youtube.com/watch?v=uqUYNqZx0qY
// Global Variables
var originalImage = null;
var grayImage = null;
var redImage = null;
var framedImage = null;
var rainbowImage = null;
var canvas = null;
/* global SimpleImage */

// Load the original image:
function loadImage() {
  var fileinput = document.getElementById("OEM-Image");
  originalImage = new SimpleImage(fileinput);
  grayImage = new SimpleImage(fileinput);
  redImage = new SimpleImage(fileinput);
  framedImage = new SimpleImage(fileinput);
  rainbowImage = new SimpleImage(fileinput);
  canvas = document.getElementById("can");
  originalImage.drawTo(canvas);
}

// Checks if the image is loaded & ready.
function imageIsLoaded(image) {
  console.assert(image, "One parameter required."); //MGP
  if (image != null && image.complete()) {
    return true;
  }
  else {
    console.trace();//MGP: Output stacktrace so we can see who called us
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

// Reset & display the original image to the canvas as well as set all images to original.
function resetImage() {
  if (imageIsLoaded(originalImage)) {
    loadImage();
  }
  originalImage.drawTo(canvas);
}

// This is what each filter button actually calls.
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

function doRainbow() {
  if (imageIsLoaded(rainbowImage)) {
    redFilter(rainbowImage);
    rainbowImage.drawTo(canvas);
  }
}

function doFrame() {
  if (imageIsLoaded(framedImage)) { //MGP: Added framedImage
    frameFilter(framedImage);  // How do the other image filters get away without passing in the image?
    //MGP: Answer -- they use the globals. Parameters are better.
    framedImage.drawTo(canvas);
  }
}

// Framed Filter Functionality:
function setBlack(pixel) {
  console.assert(pixel, "Requires: pixel");
    pixel.setRed(0);
    pixel.setGreen(0);
    pixel.setBlue(0);
    return pixel;
}

function frameFilter(framedImage){
    console.assert(framedImage,"Must pass a parameter");//MGP
    console.assert(framedImage instanceof SimpleImage ,"Must be a SimpleImage object");//MGP
    for (var pixel of framedImage.values()) {
        var thickness = 10;
        var x = pixel.getX();
        var y = pixel.getY();
        var w = framedImage.getWidth();
        var h = framedImage.getHeight();
        
        // Horizontal border
        if(x <= thickness || x >= w  - thickness) {
           setBlack(pixel);
        }
        
        // Vertical border
        if (y <= thickness || y >= h - thickness) {
            setBlack(pixel);
        }
        
        // Horizontal Center
        if (y >= (h * .5 -3) && y <= (h * .5 + 3)) {
            setBlack(pixel);
        }
        
        // Interior vertical
        if (x >= (w * .25 - 3) && x <= (w * .25 + 3)) {
            setBlack(pixel);
        }
        
        if (x >= (w * .5 - 3) && x <= (w * .5 + 3)) {
           setBlack(pixel);
        }
        
        if (x >= (w * .75 - 3) && x <= (w * .75 + 3)) {
           setBlack(pixel);
        }
       
    }
    return framedImage;
}


