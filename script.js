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
  redImage = new SimpleImage(fileinput);
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
    grayImage = originalImage;
    redImage = originalImage;
    rainbowImage = originalImage;
  }
  originalImage.drawTo(canvas);
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

function setBlack(pixel) {
    pixel.setRed(0);
    pixel.setGreen(0);
    pixel.setBlue(0);
    return pixel;
}

function addBorder(image){
    for (var pixel of image.values()){
        var thickness = 10;
        var x = pixel.getX();
        var y = pixel.getY();
        var w = image.getWidth();
        var h = image.getHeight();
        
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
        
        // Interior vertical - Left
        if (x >= (w * .25 - 3) && x <= (w * .25 + 3)) {
            setBlack(pixel);
        }
        
        // Interior vertical - Center
        if (x >= (w * .5 - 3) && x <= (w * .5 + 3)) {
           setBlack(pixel);
        }
        
        // Interior vertical - Right
        if (x >= (w * .75 - 3) && x <= (w * .75 + 3)) {
           setBlack(pixel);
        }
       
    }
    return image;
}



// This code is prototype to be worked into the project.

/*

function setBlack(pixel) {
    pixel.setRed(0);
    pixel.setGreen(0);
    pixel.setBlue(0);
    return pixel;
}

function addBorder(image, thickness){
    for (var pixel of image.values()){
        var x = pixel.getX();
        var y = pixel.getY();
        var w = image.getWidth();
        var h = image.getHeight();
        
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
        
        // Interior vertical - Left
        if (x >= (w * .25 - 3) && x <= (w * .25 + 3)) {
            setBlack(pixel);
        }
        
        // Interior vertical - Center
        if (x >= (w * .5 - 3) && x <= (w * .5 + 3)) {
           setBlack(pixel);
        }
        
        // Interior vertical - Right
        if (x >= (w * .75 - 3) && x <= (w * .75 + 3)) {
           setBlack(pixel);
        }
       
    }
    return image;
}

addBorder(image, 10);
print(image);
*/