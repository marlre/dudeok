import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Top50Page() {
  const router = useRouter();
  const { platform } = router.query;
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (platform) fetchTop50(platform);
  }, [platform]);

  const fetchTop50 = async (platform) => {
    const res = await fetch(`/api/${platform}-top50`);
    const data = await res.json();
    setItems(data);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">{platform?.toUpperCase()} Top 50</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, i) => (
          <div key={i} className="border rounded-lg shadow p-3 bg-white">
            <img src={item.thumbnail} alt={item.title} className="w-full h-48 object-cover rounded" />
            <h2 className="text-lg font-semibold mt-2">{item.title}</h2>
            {item.views && <p className="text-gray-500 text-sm mt-1">조회수: {item.views}</p>}
            <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mt-2 inline-block">보기</a>
          </div>
        ))}
      </div>
    </div>
  );
}
