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
    console.trace(); //MGP: Output stacktrace so we can see who called us
    alert("Image is not loaded.");
  }
}

// Rainbow stripes: red <128
function setRedBelow128(avg, pixel) {
  console.assert(avg, "Avg required"); //DW: This is generating an error.  I do not understand why.
  console.assert(pixel, "pixel required");
  pixel.setRed(2 * avg);
  pixel.setGreen(0);
  pixel.setBlue(0);
}
// Rainbow stripes: red >128
function setRedAbove128(avg, pixel) {
  console.assert(avg, "Avg required");
  console.assert(pixel, "pixel required");
  pixel.setRed(255);
  pixel.setGreen((2 * avg) - 255);
  pixel.setBlue((2 * avg) - 255);
}

// Rainbow stripes: orange <128
function setOrangeBelow128(avg, pixel) {
  console.assert(avg, "Avg required");
  console.assert(pixel, "pixel required");
  // console.log(avg); DW: This did not give me any information in the console
  pixel.setRed(2 * avg);
  pixel.setGreen(.8 * avg);
  pixel.setBlue(0);
}
// Rainbow stripes: orange >128
function setOrangeAbove128(avg, pixel) {
  console.assert(avg, "Avg required");
  console.assert(pixel, "pixel required");
  pixel.setRed(255);
  pixel.setGreen((1.2 * avg) - 51);
  pixel.setBlue((2 * avg) - 255);
}

// Rainbow stripes: yellow <128
function setYellowBelow128(avg, pixel) {
  console.assert(avg, "Avg required");
  console.assert(pixel, "pixel required");
  pixel.setRed(2 * avg);
  pixel.setGreen(2 * avg);
  pixel.setBlue(0);
}
// Rainbow stripes: yellow >128
function setYellowAbove128(avg, pixel) {
  console.assert(avg, "Avg required");
  console.assert(pixel, "pixel required");
  pixel.setRed(255);
  pixel.setGreen(255);
  pixel.setBlue((2 * avg) - 255);
}

// Rainbow stripes: green < 128
function setGreenBelow128(avg, pixel) {
  console.assert(avg, "Avg required");
  console.assert(pixel, "pixel required");
  pixel.setRed(0);
  pixel.setGreen(2 * avg);
  pixel.setBlue(0);
}
// Rainbow stripes: green > 128
function setGreenAbove128(avg, pixel) {
  console.assert(avg, "Avg required");
  console.assert(pixel, "pixel required");
  pixel.setRed((2 * avg) - 255);
  pixel.setGreen(255);
  pixel.setBlue((2 * avg) - 255);
}


// Rainbow stripes: blue < 128
function setBlueBelow128(avg, pixel) {
  console.assert(avg, "Avg required");
  console.assert(pixel, "pixel required");
  pixel.setRed(0);
  pixel.setGreen(0);
  pixel.setBlue(2 * avg);
}
// Rainbow stripes: blue > 128
function setBlueAbove128(avg, pixel) {
  console.assert(avg, "Avg required");
  console.assert(pixel, "pixel required");
  pixel.setRed((2 * avg) - 255);
  pixel.setGreen((2 * avg) - 255);
  pixel.setBlue(255);
}


// Rainbow stripes: indigo < 128
function setIndigoBelow128(avg, pixel) {
  console.assert(avg, "Avg required");
  console.assert(pixel, "pixel required");
  pixel.setRed(.8 * avg);
  pixel.setGreen(0);
  pixel.setBlue(2 * avg);
}
// Rainbow stripes: indigo > 128
function setIndigoAbove128(avg, pixel) {
  console.assert(avg, "Avg required");
  console.assert(pixel, "pixel required");
  pixel.setRed((1.2 * avg) - 51);
  pixel.setGreen((2 * avg) -255);
  pixel.setBlue(255);
}


// Rainbow stripes: violet < 128
function setVioletBelow128(avg, pixel) {
  console.assert(avg, "Avg required");
  console.assert(pixel, "pixel required");
  pixel.setRed(1.6 * avg);
  pixel.setGreen(0);
  pixel.setBlue(1.6 * avg);
}
// Rainbow stripes: violet > 128
function setVioletAbove128(avg, pixel) {
  console.assert(avg, "Avg required");
  console.assert(pixel, "pixel required");
  pixel.setRed((.4 * avg) + 153);
  pixel.setGreen((2 * avg) - 255);
  pixel.setBlue((.4 * avg) + 153);
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

function rainbowFilter() {
  for (var pixel of rainbowImage.values()) {
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    var h = rainbowImage.getHeight();
    var y = pixel.getY();
    // Colors stripe 1 of 7 - Red
    if (y < (h * .14285714286) && avg < 128) {
      setRedBelow128(avg, pixel);
    }
    else if (y < (h * .14285714286) && avg >= 128) {
      setRedAbove128(avg, pixel);
    }
    // Colors stripe 2 of 7 - Orange
    else if (y > (h * .14285714286) && (y <= (h * .28571428571) && avg < 128)) {
      setOrangeBelow128(avg, pixel);
    }
    else if (y > (h * .14285714286) && (y <= (h * .28571428571) && avg >= 128)) {
      setOrangeAbove128(avg, pixel);
    }
    // Colors stripe 3 of 7 - Yellow
    else if (y > (h * .28571428571) && (y <= (h * .42857142857) && avg < 128)) {
      setYellowBelow128(avg, pixel);
    }
    else if (y > (h * .28571428571) && (y <= (h * .42857142857) && avg >= 128)) {
      setYellowAbove128(avg, pixel);
    }
    // Colors stripe 4 of 7 - Green
    else if (y > (h * .42857142857) && (y <= (h * .57142857143) && avg < 128)) {
      setGreenBelow128(avg, pixel);
    }
    else if (y > (h * .42857142857) && (y <= (h * .57142857143) && avg >= 128)) {
      setGreenAbove128(avg, pixel);
    }
    // Colors stripe 5 of 7 - Blue
    else if (y > (h * .57142857143) && (y <= (h * .71428571429) && avg < 128)) {
      setBlueBelow128(avg, pixel);
    }
    else if (y > (h * .57142857143) && (y <= (h * .71428571429) && avg >= 128)) {
      setBlueAbove128(avg, pixel);
    }
    // Colors stripe 6 of 7 - Indigo
     else if (y > (h * .71428571429) && (y <= (h * .85714285714) && avg < 128)) {
       setIndigoBelow128(avg, pixel);
     }
      else if (y > (h * .71428571429) && (y <= (h * .85714285714) && avg >= 128)) {
       setIndigoAbove128(avg, pixel);
     }
     // Colors stripe 7 of 7 - Violet
      else if (y > (h * .85714285714) && avg < 128) {
       setVioletBelow128(avg, pixel);
     }
      else if (y > (h * .85714285714) && avg >= 128) {
       setVioletAbove128(avg, pixel);
     }
  }
}

// Framed Filter Functionality:
function setBlack(pixel) {
  console.assert(pixel, "Requires: pixel");
  console.assert(pixel instanceof SimplePixel, "Must be a SimplePixel object"); //MGP
  //console.log(pixel); // outputs "SimplePixel {container: SimpleImage, x: 898, y: 674}"
  pixel.setRed(0);
  pixel.setGreen(0);
  pixel.setBlue(0);
  return pixel;
}

function frameFilter(framedImage) {
  console.assert(framedImage, "Must pass a parameter"); //MGP
  console.assert(framedImage instanceof SimpleImage, "Must be a SimpleImage object"); //MGP
  for (var pixel of framedImage.values()) {
    var thickness = 10;
    var x = pixel.getX();
    var y = pixel.getY();
    var w = framedImage.getWidth();
    var h = framedImage.getHeight();

    // Horizontal border
    if (x <= thickness || x >= w - thickness) {
      setBlack(pixel);
    }
    // Vertical border
    if (y <= thickness || y >= h - thickness) {
      setBlack(pixel);
    }
    // Horizontal Center
    if (y >= (h * .5 - 3) && y <= (h * .5 + 3)) {
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
    frameFilter(framedImage); // How do the other image filters get away without passing in the image?
    //MGP: Answer -- they use the globals. Parameters are better.
    framedImage.drawTo(canvas);
  }
}