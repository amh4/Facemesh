// Install dependencies Done
// Import dependencies Done
// Setup webcam and canvas Done
// Define references Done
// Load facemesh Done
// Detect function Done
// Drawing utilities
// Load triangulation
// Setup triangle path
// Setup point drawing
// Add drawmesh to detect function

import logo from './logo.svg';
import './App.css';
import React, {useRef} from 'react';
import './App.css';
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/facemesh";
import Webcam from "react-webcam";


function App() {
  // Setup references to webcam and canvas
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

// Load facemesh from tf
const runFacemesh = async () => {
  const net = await facemesh.load({
    inputResolution:{width:640, height:480, scale:0.8}
  });
  // Sets interval to run detect every 100ms
  setInterval(()=>{
    detect(net)
  }, 100)
};

// Detect function
// Checks webcam is up and running before detecting
const detect = async (net) => {
  if (
    typeof webcamRef.current !== "undefined" &&
    webcamRef.current !== null &&
    webcamRef.current.video.readyState === 4
  ){
    // Get video proporties
    const video = webcamRef.current.video;
    const videoWidth = webcamRef.current.videoWidth;
    const videoHeight = webcamRef.current.videoHeight;

    // Set video Properties
    webcamRef.current.video.width = videoWidth;
    webcamRef.current.video.height = videoHeight;

    // Set canvas properties
    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    // Makde detections
    const face = await net.estimateFaces(video);
    console.log(face);

  }
};

runFacemesh();

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          style={{
            position:"absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex: 9,
            width: 640,
            height: 480,
          }}
        />
        <canvas
          ref={canvasRef}
          style={{
            position:"absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex: 9,
            width: 640,
            height: 480,
          }}
        />
      </header>
    </div>
  );
}

export default App;
