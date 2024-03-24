// Points for fingers
const fingerJoints = {
    thumb: [0, 1, 2, 3, 4],
    indexFinger: [0, 5, 6, 7, 8],
    middleFinger: [0, 9, 10, 11, 12],
    ringFinger: [0, 13, 14, 15, 16],
    pinky: [0, 17, 18, 19, 20],
  };
  
  // Infinity Gauntlet Style
  const style = {
    0: { color: "white", size: 5 },
    1: { color: "blue", size: 5},
    2: { color: "blue", size: 5 },
    3: { color: "blue", size: 5 },
    4: { color: "blue", size: 5 },
    5: { color: "blue", size: 5 },
    6: { color: "blue", size: 5 },
    7: { color: "blue", size: 5 },
    8: { color: "blue", size: 5 },
    9: { color: "blue", size: 5 },
    10: { color: "blue", size: 5 },
    11: { color: "blue", size: 5 },
    12: { color: "blue", size: 5 },
    13: { color: "blue", size: 5 },
    14: { color: "blue", size: 5 },
    15: { color: "blue", size: 5 },
    16: { color: "blue", size: 5 },
    17: { color: "blue", size: 5 },
    18: { color: "blue", size: 5 },
    19: { color: "blue", size: 5 },
    20: { color: "blue", size: 5 },
  };
  
  // Drawing function
  export const drawHand = (predictions, ctx) => {
    // Check if we have predictions
    if (predictions.length > 0) {
      // Loop through each prediction
      predictions.forEach((prediction) => {
        // Grab landmarks
        const landmarks = prediction.landmarks;
  
        // Loop through fingers
        for (let j = 0; j < Object.keys(fingerJoints).length; j++) {
          let finger = Object.keys(fingerJoints)[j];
          //  Loop through pairs of joints
          for (let k = 0; k < fingerJoints[finger].length - 1; k++) {
            // Get pairs of joints
            const firstJointIndex = fingerJoints[finger][k];
            const secondJointIndex = fingerJoints[finger][k + 1];
  
            // Draw path
            ctx.beginPath();
            ctx.moveTo(
              landmarks[firstJointIndex][0],
              landmarks[firstJointIndex][1]
            );
            ctx.lineTo(
              landmarks[secondJointIndex][0],
              landmarks[secondJointIndex][1]
            );
            ctx.strokeStyle = "plum";
            ctx.lineWidth = 4;
            ctx.stroke();
          }
        }
  
        // Loop through landmarks and draw em
        for (let i = 0; i < landmarks.length; i++) {
          // Get x point
          const x = landmarks[i][0];
          // Get y point
          const y = landmarks[i][1];
          // Start drawing
          ctx.beginPath();
          ctx.arc(x, y, style[i]["size"], 0, 3 * Math.PI);
  
          // Set line color
          ctx.fillStyle = style[i]["color"];
          ctx.fill();
        }
      });
    }
  };