import { useEffect, useState } from "react";

export default function TestPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/youtube-top50")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => setData({ error: err.message }));
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>API 테스트 페이지</h1>
      <p>/api/youtube-top50 결과:</p>
      <pre style={{ whiteSpace: "pre-wrap", background: "#f4f4f4", padding: "10px", borderRadius: "5px" }}>
        {data ? JSON.stringify(data, null, 2) : "로딩 중..."}
      </pre>
    </div>
  );
}
