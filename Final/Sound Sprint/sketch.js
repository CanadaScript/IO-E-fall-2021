/* 
August 2019 - Doug Whitton 
play 3 analog sensors that output sound and circle graphic
The Arduino file that's running is "threeSensorExample"
*/
//start of code made by Doug
let osc;
let playing = false;
let serial;
let latestData = "waiting for data";  // you'll use this to write incoming data to the canvas
let splitter;
let diameter0 = 0, diameter1 = 0, diameter2 = 0;
//start of by me
let song;
//end of by me
//start of code made by Doug
let osc1, osc2, osc3, fft;
changeDirection = false;
function setup() {
  
  createCanvas(windowWidth, windowHeight);
  

///////////////////////////////////////////////////////////////////
    //Begin serialport library methods, this is using callbacks
///////////////////////////////////////////////////////////////////    
    

  // Instantiate our SerialPort object
  serial = new p5.SerialPort();

  // Get a list the ports available
  // You should have a callback defined to see the results
  serial.list();
  console.log("serial.list()   ", serial.list());

  //////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////
  // Assuming our Arduino is connected, let's open the connection to it
  // Change this to the name of your arduino's serial port
  serial.open("COM4");
 /////////////////////////////////////////////////////////////////////////////
 ///////////////////////////////////////////////////////////////////////////
 ////////////////////////////////////////////////////////////////////////////
  // Here are the callbacks that you can register

  // When we connect to the underlying server
  serial.on('connected', serverConnected);

  // When we get a list of serial ports that are available
  serial.on('list', gotList);
  // OR
  //serial.onList(gotList);

  // When we some data from the serial port
  serial.on('data', gotData);
  // OR
  //serial.onData(gotData);

  // When or if we get an error
  serial.on('error', gotError);
  // OR
  //serial.onError(gotError);

  // When our serial port is opened and ready for read/write
  serial.on('open', gotOpen);
  // OR
  //serial.onOpen(gotOpen);

  // Callback to get the raw data, as it comes in for handling yourself
  //serial.on('rawdata', gotRawData);
  // OR
  //serial.onRawData(gotRawData);
  //end of code made by Doug
  //start of code made by me
  //sound gained from https://www.pachd.com/sounds.html
  song = loadSound('assets/air_spray2.wav');
  //end of code made by me
}
////////////////////////////////////////////////////////////////////////////
// End serialport callbacks
///////////////////////////////////////////////////////////////////////////



//start of code made by Doug
// We are connected and ready to go
function serverConnected() {
  console.log("Connected to Server");
}

// Got the list of ports
function gotList(thelist) {
  console.log("List of Serial Ports:");
  // theList is an array of their names
  for (var i = 0; i < thelist.length; i++) {
    // Display in the console
    console.log(i + " " + thelist[i]);
  }
}

// Connected to our serial device
function gotOpen() {
  console.log("Serial Port is Open");
}

// Ut oh, here is an error, let's log it
function gotError(theerror) {
  console.log(theerror);
}



// There is data available to work with from the serial port
function gotData() {
  var currentString = serial.readLine();  // read the incoming string
  trim(currentString);                    // remove any trailing whitespace
  if (!currentString) return;             // if the string is empty, do no more
  console.log("currentString  ", currentString);             // println the string
  latestData = currentString;            // save it for the draw method
  console.log("latestData" + latestData);   //check to see if data is coming in
  splitter = split(latestData, ',');       // split each number using the comma as a delimiter
  //console.log("splitter[0]" + splitter[0]); 
  diameter0 = splitter[0];                 //put the first sensor's data into a variable
  diameter1 = splitter[1];
  diameter2 = splitter[2]; 



}

// We got raw data from the serial port
function gotRawData(thedata) {
  println("gotRawData" + thedata);
}
//end of code made by Doug


//start of code made by Doug
function draw() {
  
  background(0,255,0);
  text(latestData, 10,10);
     
  fill(255,0,0);
  noStroke(); 
  //end of code made by Doug
  //console.log("diameter0  "  + diameter0);
  //ellipse(100, 100, diameter0*100, diameter0*100);
  //start of code made by me that I changed
  triangle(300, 100, diameter1, diameter2)
      
  fill(255, 90, 95);
  //ellipse(200, 100, diameter1, diameter1);
  rect(200, 100, diameter1, diameter2)
  
  fill(200, 29, 37);
  //ellipse(300, 100, diameter2, diameter2);
  ellipse(300, 100, diameter1, diameter2)
  
  playAir();
 //end of code made by me that I changed
 
}

//start of code made by me with help from a student
function playAir() {

  if (diameter1 >= 75) {
    translate(width * 0.2, height * 0.5);

  song.loop();
  
  // drawBoom();
  
  }
  
  if (diameter1 <= 76) {
  
  song.stop();
  
  }
  
  };
//end of code made by me with help from a student
//start of code made by Doug
function mouseClicked(){
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
    console.log("getAudioContext().state" + getAudioContext().state);
  }
  };
  //end of code made by Doug
  


  

 