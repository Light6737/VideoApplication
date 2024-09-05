import React, { useState, useEffect } from 'react';
import axios from 'axios';

function History() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:5001/api/videos', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setVideos(response.data); 
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="history">
      <h2>Compressed Files</h2>
      {videos.length > 0 ? (
        videos.map((video, index) => (
          <div key={index} className="video-history-item" >
            <video
              src={`http://localhost:5001/uploads/${video}`} 
              controls
              width="640"
              height="65"
              
            ></video>
            <p>{video}</p>
          </div>
        ))
      ) : (
        <p>No videos found.</p>
      )}
    </div>
  );
}

export default History;
