import { useEffect, useState } from 'react';

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch('/api/youtube-top50');
        const data = await res.json();
        setVideos(data.items || []); // items 배열을 저장
      } catch (error) {
        console.error('데이터 불러오기 실패:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchVideos();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>YouTube 쇼츠 Top10</h1>
      {loading ? (
        <p>불러오는 중...</p>
      ) : videos.length === 0 ? (
        <p>데이터가 없습니다.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          {videos.slice(0, 10).map((video) => (
            <div key={video.id.videoId || video.id} style={{ border: '1px solid #ccc', padding: '10px' }}>
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
                style={{ width: '100%' }}
              />
              <h3>{video.snippet.title}</h3>
              <a href={`https://www.youtube.com/watch?v=${video.id.videoId || video.id}`} target="_blank" rel="noopener noreferrer">
                영상보기
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
