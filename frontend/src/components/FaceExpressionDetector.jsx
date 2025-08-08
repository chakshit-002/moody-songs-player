// src/components/FaceExpressionDetector.jsx

import React, { useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';
import './FaceExpreDet.css'
import axios from 'axios';

const FaceExpressionDetector = ({setSongs,setIsPlaying}) => {
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

  const detectMood = async () => {
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

        // get http://localhost:3000/songs?mood=happy
        axios.get(`http://localhost:3000/songs?mood=${_expression}`)
        .then((response)=>{
          console.log(response.data)
          setSongs(response.data.songs)
        })
        setIsPlaying(null);
  };

  useEffect(() => {
    const initialize = async () => {
      await loadModels();
      startVideo();

      // Set up detection loop
    //   const interval = setInterval(() => {
    //     detectMood();
    //   }, 5000); // every 0.5 second

      return () => clearInterval(interval);
    };

    initialize();
  }, []);

  return (
    <div className="face-exp-det-cont">
      
      <div className='vid-container' >
        <video
          ref={videoRef}
          autoPlay
          muted
          className="video-webcam"
          
        />
       
      </div>

      <button className='det-mood-btn' onClick={detectMood}>Detect Mood </button>
    </div>
  );
};

export default FaceExpressionDetector;
