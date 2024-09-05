import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function VideoPlayer() {
  const { id } = useParams();
  const history = useNavigate();
  const [videoUrl, setVideoUrl] = useState('');
  const [fileSize, setFileSize] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5001/uploads/Video1.mp4`)
      .then(response => {
        setVideoUrl(`http://localhost:5001/uploads/Video1.mp4`);
        setFileSize(response.data.compressed_size);
      })
      .catch(error => {
        console.error('Error fetching video:', error);
      });
  }, [id]);

  return (
    <div className="video-player">
      <h2>Your video is ready to download</h2>
      <video controls src={videoUrl} style={{ width: '100%' }}></video>
      <p>New Compressed File Size: {fileSize}</p>
      <div className="video-player-buttons">
        <button onClick={() => history.push('/dashboard')}>Back</button>
        <button onClick={() => history.push('/history')}>All Videos</button>
        <a href={videoUrl} download>
          <button>Download</button>
        </a>
      </div>
    </div>
  );
}

export default VideoPlayer;
