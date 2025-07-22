export default async function handler(req, res) {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const regionCode = "KR"; // 한국 인기 영상
  const maxResults = 10;

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=${maxResults}&regionCode=${regionCode}&key=${apiKey}`
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("YouTube API Error:", error);
    res.status(500).json({ error: "YouTube API 호출 실패" });
  }
}
