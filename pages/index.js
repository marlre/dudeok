import { useEffect, useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('youtube');
  const [youtubeData, setYoutubeData] = useState([]);
  const [redditData, setRedditData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (activeTab === 'youtube') {
          const res = await fetch('/api/youtube-top50');
          const data = await res.json();
          setYoutubeData(data.items || []);
        } else if (activeTab === 'reddit') {
          const res = await fetch('/api/reddit');
          const data = await res.json();
          setRedditData(data.posts || []);
        } else if (activeTab === 'news') {
          const res = await fetch('/api/bmw-news');
          const data = await res.json();
          setNewsData(data.articles || []);
        }
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchData();
  }, [activeTab]);

  const tabs = [
    { id: 'youtube', label: 'YouTube 쇼츠 Top10' },
    { id: 'reddit', label: 'Reddit 게시물' },
    { id: 'news', label: 'BMW 뉴스' },
  ];

  const renderContent = () => {
    if (loading) return <p className="text-center text-gray-600">로딩 중...</p>;

    const data =
      activeTab === 'youtube'
        ? youtubeData
        : activeTab === 'reddit'
        ? redditData
        : newsData;

    if (!data || data.length === 0) {
      return <p className="text-center text-gray-500">데이터가 없습니다.</p>;
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {data.slice(0, 10).map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow hover:shadow-lg transition p-4">
            <img
              src={item.thumbnail || item.urlToImage || '/no-image.jpg'}
              alt={item.title}
              className="rounded-md w-full h-40 object-cover"
            />
            <h3 className="text-lg font-semibold mt-3 line-clamp-2">{item.title}</h3>
            <a
              href={item.link || item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              영상보기
            </a>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center">YouTube / Reddit / BMW 뉴스</h1>
      <div className="flex justify-center space-x-4 mt-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2 rounded ${
              activeTab === tab.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-8">{renderContent()}</div>
    </div>
  );
}

