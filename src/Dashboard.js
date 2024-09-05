import React, { useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [video, setVideo] = useState(null);
  const [format, setFormat] = useState('mp4');
  const [resolution, setResolution] = useState('720p');
  const [bitrate, setBitrate] = useState('medium');
  const [framerate, setFramerate] = useState('30fps');
  const [message, setMessage] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  const handleVideoUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('video', video);
    formData.append('format', format);
    formData.append('resolution', resolution);
    formData.append('bitrate', bitrate);
    formData.append('framerate', framerate);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5001/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token,
        },
      });

      setMessage(response.data.message);
      setVideoUrl(response.data.videoUrl);
    } catch (err) {
      setMessage('Failed to upload video.');
    }
  };

  return (
    <div className="dashboard">
      <h2>You may begin to compress the video</h2>
      <form onSubmit={handleVideoUpload}>
        <input type="file" onChange={(e) => setVideo(e.target.files[0])} />
        <select onChange={(e) => setFormat(e.target.value)} value={format}>
          <option value="mp4">MP4</option>
          <option value="avi">AVI</option>
        </select>
        <select onChange={(e) => setResolution(e.target.value)} value={resolution}>
          <option value="720p">720p</option>
          <option value="1080p">1080p</option>
        </select>
        <select onChange={(e) => setBitrate(e.target.value)} value={bitrate}>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <select onChange={(e) => setFramerate(e.target.value)} value={framerate}>
          <option value="30fps">30 FPS</option>
          <option value="60fps">60 FPS</option>
        </select>
        <button type="submit">Compress</button>
      </form>
      {message && <p>{message}</p>}
      {videoUrl && (
        <div>
          <video controls src={videoUrl} style={{ width: '100%' }}></video>
          <p>New Compressed File Size: (calculated by backend)</p>
          <div>
            <button onClick={() => window.location.href = videoUrl}>Download</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
