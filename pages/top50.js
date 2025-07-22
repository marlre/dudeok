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
      <h1>API 테스트 페이지</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
