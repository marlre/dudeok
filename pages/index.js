import { useEffect, useState } from 'react';

export default function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch('/api/youtube-top10')
      .then(res => res.json())
      .then(data => setVideos(data.items || []));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>YouTube 쇼츠 Top10</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {videos.map((video, idx) => (
          <div key={idx} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '10px' }}>
            <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} style={{ width: '100%', borderRadius: '10px' }} />
            <h3>{video.snippet.title}</h3>
            <a href={`https://www.youtube.com/watch?v=${video.id.videoId}`} target="_blank" rel="noopener noreferrer">
              영상보기
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
