import { useState, useEffect } from "react";

export default function Home() {
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState("");
  const correctPassword = "2613";
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (password === correctPassword) {
      setAuthorized(true);
    } else {
      alert("비밀번호가 틀렸습니다.");
    }
  };

  useEffect(() => {
    if (authorized) {
      fetchVideos();
    }
  }, [authorized]);

  const fetchVideos = async () => {
    setLoading(true);
    const res = await fetch("/api/youtube-top50");
    const data = await res.json();
    setVideos(data.items || []);
    setLoading(false);
  };

  if (!authorized) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h1>사이트 접속 비밀번호</h1>
        <input
          type="password"
          placeholder="비밀번호 입력"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>접속하기</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>YouTube / Reddit / BMW 뉴스</h1>
      {loading ? <p>로딩 중...</p> : (
        <div>
          {videos.map((video) => (
            <div key={video.id} style={{ marginBottom: "20px" }}>
              <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
              <h2>{video.snippet.title}</h2>
              <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer">
                영상보기
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
