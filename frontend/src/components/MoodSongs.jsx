import React, { useState } from 'react'
import './MoodSongs.css'
const MoodSongs = () => {
    const [songs, setSongs] = useState([
        {
            title: "test_title",
            artist: "test_artist",
            url: "test_url",
        },
        {
            title: "test_title",
            artist: "test_artist",
            url: "test_url",
        },
        {
            title: "test_title",
            artist: "test_artist",
            url: "test_url",
        }
    ])
    return (
        <div className='mood-songs-list'>
            <h2>Recommended Songs</h2>
            {songs.map((song, index) => (
                <div className='song' key={index}>
                    <div className='song-det'>
                        <h3>{song.title}</h3>
                        <p>{song.artist}</p>
                    </div>
                    <div className='play-pause-btn'>
                        <i className="ri-pause-line"></i>
                        <i className="ri-play-circle-line"></i>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MoodSongs