import React, { useState } from 'react'
import FaceExpressionDetector from './components/FaceExpressionDetector'
import MoodSongs from './components/MoodSongs'

const App = () => {
   const [songs, setSongs] = useState([])
   const [isPlaying, setIsPlaying] = useState(null);
  return (
    <div className='appDiv'>
      <FaceExpressionDetector setSongs={setSongs} setIsPlaying={setIsPlaying}/>
      <MoodSongs Songs={songs} isPlaying = {isPlaying} setIsPlaying={setIsPlaying}/>
    </div>
  )
}

export default App