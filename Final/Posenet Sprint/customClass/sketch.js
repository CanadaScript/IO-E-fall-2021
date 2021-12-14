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
let objectX;
let coinX;
//code added by me
let img;
let img2;
let leftWrist;
let rightWrist;
//end of code added by me
let skeleton;
//https://www.pngall.com/gold-coin-png/download/40162
//https://www.pikpng.com/downpngs/Tohhbi_outline-of-a-rocket-png-download-rocket-clipart/
function preload() {
  img = loadImage('rocket.png');
  img2 = loadImage('coin.png');
}

//example code from codingtrain
function setup() {
    createCanvas(windowWidth/2, windowHeight/2);
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
  let rightWristCam = false;
  image(video, 0, 0, width, height);
  //TRESHOLD 0 is white  1 is black
  filter(THRESHOLD,0);
  strokeWeight(2);

  // For one pose only (use a for loop for multiple poses!)
  if (poses.length > 0) {
    const pose = poses[0].pose;
      console.log(pose);
  //     for(let i = 0; i < poses.length; i++){
  //       console.log("test");
  //       if(i == rightWrist){
  //         rightWristCam = true;
  //         console.log("rightWristFound");
  //       }
  //     }
//end code by katlin
//code by me
// image(img, 0, 0, 200, 200);
leftWrist = poses[0].pose.keypoints[9].position;
rightWrist = poses[0].pose.keypoints[10].position;
objectX = rightWrist.x;
coinX = leftWrist.x;

  
//if the left wrist and the right wrist come close together change variable
//if(rightWrist.x == leftWrist.x - 100){
  //objectX = leftWrist.x;
//}

  }
  //image(img, 100, 300, 200, 200);
  
  if (rightWrist){
    image(img, objectX + 50, objectX - 50, 200, 200); 
  }
  //image(img2, 500, 600, 100, 100);
  //code created by me with tutor
  if (leftWrist){
    //Interaction happens here
  //make coin smaller when close to rocket ship
    if (objectX < coinX - 10){
      image(img2, coinX, coinX, 10, 10);
    } else {
      image(img2, coinX + 50, coinX - 50, 100, 100);
    }
  }
  
}
//end code created by me with tutor
//end code by katlin https://p5js.org/reference/#/p5/image
// from Christopher Kovacs to everyone:    12:22 PM
// https://p5js.org/reference/#/p5/image
// from Christopher Kovacs to everyone:    12:44 PM
// https://editor.p5js.org/monicawen/sketches/rJNDHgqRQ
// from Christopher Kovacs to everyone:    12:44 PM
// let rightWrist = poses[0].pose.keypoints[10].position;//from Christopher Kovacs to everyone:    2:47 PM
// https://github.com/ml5js/ml5-library/issues/245
// from Christopher Kovacs to everyone:    2:48 PM
// https://www.youtube.com/watch?v=EA3-k9mnLHs
// from Christopher Kovacs to everyone:    2:50 PM
// https://editor.p5js.org/codingtrain/sketches/By8YLbXyE