import React, { useState } from 'react'
import './MoodSongs.css' 
const MoodSongs = ({Songs,isPlaying ,setIsPlaying}) => {
    let userMood = null;
   
    const handlePlayPause = (index)=>{
        if(isPlaying === index ){
            setIsPlaying(null);
            console.log("stop",Songs[0].mood);
        }
        else{
            setIsPlaying(index);
            userMood = Songs[0].mood
            console.log("play",Songs[0].mood);
        }
    }
   
    return (
        <div className='mood-songs-list'>
            <h2>Recommended Songs</h2>
            {Songs.map((song, index) => (
                <div className='song' key={index}>
                    <div className='song-det'>
                        <h3>{song.title}</h3>
                        <p>{song.artist}</p>
                    </div>
                    <div className='play-pause-btn'>
                        {
                            isPlaying === index && 
                            <audio
                                 src={song.audio}
                                 style={{display:'none'}}
                                 autoPlay={isPlaying === index}
                            ></audio>
                            
                        }
                        <button onClick={()=> handlePlayPause(index)}>
                            {
                                isPlaying === index ? 
                                <i className="ri-pause-line"></i> 
                                : <i className="ri-play-circle-line"></i>
                            }
                             
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MoodSongs