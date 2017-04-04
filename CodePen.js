// Load the original image:
var originalImage = null;
var grayImage = null;
var redImage = null;
var rainbowImage = null;
var canvas = null;
/* global SimpleImage */

function imageIsLoaded(image) {
    if (image != null && image.complete()) {
        return true;
    }
    else {
        alert("Image not ready.");
        return false;
    }
}

function doGray() {
    if (imageIsLoaded(grayImage)) { // check if image is loaded
        grayscaleFiter(); // function performs the grayscale work
        grayImage.drawTo(canvas); // display image
    }
}

function loadImage() {
    canvas = document.getElementById("can");
    var fileInput = document.getElementById("OEM-Image");
    originalImage = new SimpleImage(fileInput);
    grayImage = new SimpleImage(fileInput);
    redImage = new SimpleImage(fileInput);
    rainbowImage = new SimpleImage(fileInput);
    originalImage.drawTo(canvas);
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

// Reset the image back to the original version
function resetImage() {
    originalImage.drawTo(canvas);
}

function redFilter() {
    resetImage()
    alert("Red Filter Applied.")
}

function rainbowFilter() {
    resetImage()
    alert("Rainbow Filter Applied.")
}