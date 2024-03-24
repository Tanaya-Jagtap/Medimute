import React, { useRef, useState } from 'react';
import './WebcamCapture.css';
// import * as Hands from '@mediapipe/hands';

const WebcamCapture = () => {
  const videoRef = useRef(null);
  const [mediaStream, setMediaStream] = useState(null);

  const startCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setMediaStream(stream);
      videoRef.current.srcObject = stream;
    } catch (err) {
      console.error('Error accessing webcam:', err);
    }
  };

  const stopCapture = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => {
        track.stop();
      });
      setMediaStream(null);
    }
  };

  

  return (
    <div>
      <button onClick={startCapture}>Start Capture</button>
      <button onClick={stopCapture}>Stop Capture</button>
      <video ref={videoRef} width={640} height={10} autoPlay muted />
      <video className="mirror" ref={videoRef} autoPlay playsInline />
      
    </div>
  );
};

export default WebcamCapture;