"use strict"; // MGP: https://www.youtube.com/watch?v=uqUYNqZx0qY
// Global Variables
var originalImage = null;
var grayImage = null;
var redImage = null;
var framedImage = null;
var rainbowImage = null;
var canvas = null;
/* global SimpleImage */
/* global SimplePixel */

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

// Rainbow stripes: red <128
function setRedBelow128(avg, pixel) {
  console.assert(avg, "Avg required"); //DW: This is generating an error.  I do not understand why.
  console.assert(pixel, "pixel required");
      pixel.setRed(avg * 2);
      pixel.setGreen(0);
      pixel.setBlue(0);
}
// Rainbow stripes: red >128
function setRedAbove128(avg, pixel) {
  console.assert(avg, "Avg required");
  console.assert(pixel, "pixel required");
  pixel.setRed(255);
  pixel.setGreen((2 * avg) - 255);
  pixel.setBlue((2 * avg) -255);
}

// Rainbow stripes: orange <128
function setOrangeBelow128(avg, pixel) {
  console.assert(avg, "Avg required");
  console.assert(pixel, "pixel required");
  // console.log(avg); DW: This did not give me any information in the console
      pixel.setRed(avg * 2);
      pixel.setGreen(avg * .8);
      pixel.setBlue(0);
}

// Rainbow stripes: orange >128
function setOrangeAbove128(avg, pixel) {
  console.assert(avg, "Avg required");
  console.assert(pixel, "pixel required");
  pixel.setRed(255);
  pixel.setGreen((1.2 * avg) - 51);
  pixel.setBlue((2 * avg) -255);
}




// Filter Effects:
function grayscaleFiter() {
  for (var pixel of grayImage.values()) {
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    pixel.setRed(avg);
    pixel.setGreen(avg);
    pixel.setBlue(avg);
  }
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

/*
1/7	0.14285714
2/7	0.28571429
3/7	0.42857143
4/7	0.57142858
*/


// This will be modified to be the rainbowFilter()
function rainbowFilter() {
  for (var pixel of rainbowImage.values()) {
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    var h = rainbowImage.getHeight();
    var y = pixel.getY();
    if (y < (h * .14285714) && avg < 128) {
     setRedBelow128(avg, pixel);
    }
    else if (y < (h * .14285714) && avg >= 128) {
      setRedAbove128(avg, pixel);
    }
    else if (y > (h * .14285714) && (y <= (h * .28571429) && avg < 128)) {
     setOrangeBelow128(avg, pixel);
    }
   else if (y > (h * .14285714) && (y <= (h * .28571429) && avg >= 128)) {
     setOrangeAbove128(avg, pixel);
  }
}
}

// Framed Filter Functionality:
function setBlack(pixel) {
  console.assert(pixel, "Requires: pixel");
  console.assert(pixel instanceof SimplePixel ,"Must be a SimplePixel object");//MGP
  //console.log(pixel); // outputs "SimplePixel {container: SimpleImage, x: 898, y: 674}"
    pixel.setRed(0);
    pixel.setGreen(0);
    pixel.setBlue(0);
    return pixel;
}

function frameFilter(framedImage) {
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
        // Interior vertical
        if (x >= (w * .5 - 3) && x <= (w * .5 + 3)) {
           setBlack(pixel);
        }
        // Interior vertical
        if (x >= (w * .75 - 3) && x <= (w * .75 + 3)) {
           setBlack(pixel);
        }
    }
    return framedImage;
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
    rainbowFilter(rainbowImage);
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