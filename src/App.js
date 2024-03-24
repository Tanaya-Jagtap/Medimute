import React, {useRef} from 'react';
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import { drawHand } from "./utilities";

function App() {

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const runHandpose = async() =>{
    const net = await handpose.load()
    console.log("handpose Model loaded !")

    setInterval(() => {
      detect(net);
    }, 100);
  }

  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) 
    {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const hands = await net.estimateHands(video);
      console.log(hands);

      // Process hand data
    if (hands.length > 0) {
      // Assuming only one hand is detected
      const hand = hands[0];
      const landmarks = hand.landmarks;

      // Extract x and y coordinates from landmarks
      const coordinates = landmarks.map((point) => [point[0], point[1]]);




      function preProcessLandmark(landmarkList) {
        // Deep copy the landmark list
        const tempLandmarkList = JSON.parse(JSON.stringify(landmarkList));
    
        // Convert to relative coordinates
        let baseX = 0, baseY = 0;
        for (let index = 0; index < tempLandmarkList.length; index++) {
            const landmarkPoint = tempLandmarkList[index];
            if (index === 0) {
              baseX = landmarkPoint[0];
              baseY = landmarkPoint[1];
            }
    
          tempLandmarkList[index][0] -= baseX;
          tempLandmarkList[index][1] -= baseY;
        }
    
        // Convert to a one-dimensional array
        const flattenedLandmarkList = tempLandmarkList.flat();
    
        // Normalization
        const maxValue = Math.max(...flattenedLandmarkList);
    
        const normalize = (n) => n / maxValue;
    
        const normalizedLandmarkList = flattenedLandmarkList.map(normalize);

        console.log("This is Landmark list:");
        console.log(normalizedLandmarkList);


      //   try {
      //     // Load the TensorFlow.js model
      //     const model = tf.loadLayersModel('/model.json');
  
      //     // Convert input data to a TensorFlow.js tensor
      //     const inputTensor = tf.tensor2d([normalizedLandmarkList], [1, 42]);
  
      //     // Make predictions
      //     const predictions = model.predict(inputTensor);
  
      //     // Get the predicted class (0, 1, or 2)
      //     const predictedClass = predictions.argMax(1).dataSync()[0];
  
      //     // Return the predicted class
      //     return predictedClass;
      // } catch (error) {
      //     // Handle error
      //     console.error('Error loading or predicting:', error);
      //     return null; // Return null in case of error
      // }


      }



      async function predict() {
        try {
            // Load the TensorFlow.js model
            const model = await tf.loadLayersModel('/model.json');
    
            // Convert input data to a TensorFlow.js tensor
            const inputTensor = tf.tensor2d([1, 42]);
    
            // Make predictions
            const predictions = model.predict(inputTensor);
    
            // Get the predicted class (0, 1, or 2)
            const predictedClass = predictions.argMax(1).dataSync()[0];
    
            // Return the predicted class
            return predictedClass;
        } catch (error) {
            // Handle error
            console.error('Error loading or predicting:', error);
            return null; // Return null in case of error
        }
    }





      console.log("Coordinates:", coordinates);
      console.log(preProcessLandmark(coordinates));
      
      const predictionResult = await predict(coordinates);
      console.log("Prediction result:", predictionResult);

    }

    // Draw mesh
    const ctx = canvasRef.current.getContext("2d");
    drawHand(hands, ctx); // Draw the hand landmarks
    
    }
  };

  runHandpose();

  return (
    <div className="App">
      <Webcam ref={webcamRef}
        style={{
          position:"absolute",
          testAlign:"centre",
          zindex:"9",
          width:"680",
          height:"450"
      }} 
      />

      <canvas
        ref={canvasRef}
        style={{
          position:"absolute",
          testAlign:"centre",
          zindex:"9",
          width:"680",
          height:"450"
        }}
       
      />

    </div>
  );
}

export default App;   