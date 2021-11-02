// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

let video;
let poseNet;
let poses = [];
//code added by me
let img;
//end of code added by me
let skeleton;
//Dudley, Swati. “Hat.” Toppng, 7 July 2018, https://toppng.com/free-image/black-hat-PNG-free-PNG-Images_22689. Accessed 31 Oct. 2021. 
function preload() {
  img = loadImage('hat_new.png');
  
}
//example code from codingtrain
function setup() {
    createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  
//end example code from codingtrain
  // Create a new poseNet method with a single detection
  //example code from katlin
  poseNet = ml5.poseNet(video, {outputStride:8, quantBytes:4}, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  select('#status').html('Model Loaded');
}
//end example code from katlin
//code changed by me
function mousePressed(){
  console.log(JSON.stringify(poses))
}
//end code changed by me
//code by katlin
function draw() {
  image(video, 0, 0, width, height);
  //TRESHOLD 0 is white  1 is black
  filter(THRESHOLD,0);
  strokeWeight(2);

  // For one pose only (use a for loop for multiple poses!)
  if (poses.length > 0) {
    const pose = poses[0].pose;
      console.log(pose);
//end code by katlin
//code by me
      // Create a pink ellipse for the nose
    //fill(213, 0, 143);
    const nose = pose.nose;
//end code by katlin
// code by katlin changed by me
//position the hat on your own, just change the numbers in bold
    image(img, nose.x - 400, nose.y + 270);
//end code by katlin changed by me
//the line below does something funny, so I commented it out
      //img.size(600,600);
      
    // Create a pink ellipse for the nose
    //fill(213, 0, 143);
    //const nose = pose.nose;
   // ellipse(nose.x, nose.y, 20, 20);

    // Create a yellow ellipse for the right eye
    // code by katlin
    fill(255, 215, 0);
    const rightEye = pose.rightEye;
    image(img, rightEye.x - 350, rightEye.y - 480);


    // Create a yellow ellipse for the right eye
      fill(255, 215, 0);
    const leftEye = pose.leftEye;
    ellipse(leftEye.x, leftEye.y, 20, 20);
      
    fill(0,255,0);
      const rightShoulder = pose.rightShoulder;
    ellipse(rightShoulder.x, rightShoulder.y, 20, 20 );  

  }
}
//end code by katlin