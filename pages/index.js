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
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        <h1 className="text-2xl font-bold mb-4">사이트 접속 비밀번호</h1>
        <input
          type="password"
          className="border rounded p-2 mb-4 w-64"
          placeholder="비밀번호 입력"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleLogin}
        >
          접속하기
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">YouTube / Reddit / BMW 뉴스</h1>
      {loading ? (
        <div className="flex justify-center items-center py-20">로딩 중...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div key={video.id} className="border rounded-lg shadow p-3 bg-white">
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
                className="w-full h-48 object-cover rounded"
              />
              <h2 className="text-lg font-semibold mt-2">{video.snippet.title}</h2>
              <a
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline mt-2 inline-block"
              >
                영상보기
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
