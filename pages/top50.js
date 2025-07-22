// pages/api/youtube-top50.js
export default async function handler(req, res) {
  const apiKey = process.env.YOUTUBE_API_KEY; // Vercel 환경변수에서 키 가져옴
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&regionCode=KR&maxResults=10&videoDuration=short&type=video&order=viewCount&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("YouTube API Error:", error);
    res.status(500).json({ error: "API 호출 실패" });
  }
}
