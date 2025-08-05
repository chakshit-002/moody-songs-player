// src/components/FaceExpressionDetector.jsx

import React, { useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';

const FaceExpressionDetector = () => {
  const videoRef = useRef(null);
  
  const loadModels = async () => {
const MODEL_URL = '/models';

    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
    ]);
    console.log('Models loaded');
  };

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => {
        console.error('Webcam error:', err);
      });
  };

  const detectFace = async () => {
    if (!videoRef.current ) return;

    const detections = await faceapi
      .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();
        let mostProbableExpression = 0;
        let _expression = '';
        if(!detections || detections.length==0){
            console.log("no face  detected")
            return;
        }
        for(const expression of Object.keys(detections[0].expressions)){
            if(detections[0].expressions[expression] > mostProbableExpression){
                mostProbableExpression = detections[0].expressions[expression];
                _expression = expression;
            }
        }
        console.log(_expression)
  };

  useEffect(() => {
    const initialize = async () => {
      await loadModels();
      startVideo();

      // Set up detection loop
    //   const interval = setInterval(() => {
    //     detectFace();
    //   }, 5000); // every 0.5 second

      return () => clearInterval(interval);
    };

    initialize();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-4 relative">
      <h2 className="text-xl font-bold mb-4">Facial Expression Detection</h2>
      <div style={{ position: 'relative', width: 720, height: 560 }}>
        <video
          ref={videoRef}
          autoPlay
          muted
          width="720"
          height="560"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            borderRadius: '10px',
            border: '2px solid #ccc',
          }}
        />
       
      </div>

      <button onClick={detectFace}>Detect Mood </button>
    </div>
  );
};

export default FaceExpressionDetector;
