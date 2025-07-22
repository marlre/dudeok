import { useEffect, useState } from 'react';

export default function Top50() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/youtube-top50');
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError('데이터를 불러올 수 없습니다.');
      }
    }
    fetchData();
  }, []);

  if (error) return <p>{error}</p>;
  if (!data) return <p>불러오는 중...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>YouTube 쇼츠 Top10</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
        {data.items.map((video) => (
          <div key={video.id} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '8px' }}>
            <img
              src={video.snippet.thumbnails.high.url}
              alt={video.snippet.title}
              style={{ width: '100%', borderRadius: '8px' }}
            />
            <p>{video.snippet.title}</p>
            <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer">
              영상보기
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
