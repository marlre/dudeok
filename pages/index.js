import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState("");
  const correctPassword = "2613";

  const handleLogin = () => {
    if (password === correctPassword) setAuthorized(true);
    else alert("비밀번호가 틀렸습니다.");
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
      <p className="text-center text-gray-600">메인 페이지</p>
      <div className="text-center mt-4">
        <Link href="/top50?platform=youtube">
          <button className="px-5 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">
            YouTube Top50 보기
          </button>
        </Link>
      </div>
    </div>
  );
}
