
import { useEffect, useState } from "react";

export default function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch("/api/youtube-shorts")
      .then(res => res.json())
      .then(data => setVideos(data.items || []))
      .catch(err => console.error("Error fetching shorts:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>YouTube 쇼츠 Top10</h1>
      {videos.map(video => (
        <div key={video.id} style={{ marginBottom: "20px" }}>
          <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
          <h3>{video.snippet.title}</h3>
          <a href={`https://youtube.com/watch?v=${video.id}`} target="_blank">영상보기</a>
        </div>
      ))}
    </div>
  );
}
