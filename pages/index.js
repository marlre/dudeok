import { useEffect, useState } from 'react';

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState('');

  const correctPassword = '1234'; // 여기에 비밀번호 설정

  const handleLogin = () => {
    if (password === correctPassword) {
      setAuthorized(true);
    } else {
      alert('비밀번호가 틀렸습니다!');
    }
  };

  useEffect(() => {
    if (!authorized) return;
    const fetchData = async () => {
      try {
        const res = await fetch('/api/youtube-top50');
        const data = await res.json();
        // 쇼츠(1분 미만)만 필터링
        const shorts = data.items.filter((item) => {
          const duration = item.contentDetails?.duration || '';
          const match = duration.match(/PT(\d+)M?(\d+)?S?/);
          let totalSeconds = 0;
          if (match) {
            const minutes = parseInt(match[1] || 0);
            const seconds = parseInt(match[2] || 0);
            totalSeconds = minutes * 60 + seconds;
          }
          return totalSeconds > 0 && totalSeconds < 60;
        });
        setVideos(shorts);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [authorized]);

  if (!authorized) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>사이트 접속 비밀번호</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>입력</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>YouTube 쇼츠 Top10</h1>
      {loading && <p>불러오는 중...</p>}
      {!loading && videos.length === 0 && <p>데이터가 없습니다.</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {videos.slice(0, 10).map((video) => (
          <div key={video.id} style={{ width: '300px', textAlign: 'center' }}>
            <img
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.title}
              style={{ width: '100%', borderRadius: '8px' }}
            />
            <h3>{video.snippet.title}</h3>
            <a
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                padding: '5px 10px',
                backgroundColor: 'red',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '4px',
              }}
            >
              영상보기
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
