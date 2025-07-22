export default async function handler(req, res) {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const regionCode = "KR";
  const maxResults = 25; // 더 많이 가져와서 1분 미만만 필터링
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&chart=mostPopular&maxResults=${maxResults}&regionCode=${regionCode}&key=${apiKey}`
    );
    const data = await response.json();
    // ISO 8601 duration -> 초 단위 변환
    const parseDuration = (duration) => {
      const match = duration.match(/PT(\d+M)?(\d+S)?/);
      const minutes = match[1] ? parseInt(match[1].replace('M', '')) : 0;
      const seconds = match[2] ? parseInt(match[2].replace('S', '')) : 0;
      return minutes * 60 + seconds;
    };
    const shorts = (data.items || []).filter((video) => {
      const duration = parseDuration(video.contentDetails.duration);
      return duration <= 60; // 1분 이하
    }).slice(0, 10); // Top10만
    res.status(200).json({ items: shorts });
  } catch (error) {
    console.error("YouTube Shorts API Error:", error);
    res.status(500).json({ error: "YouTube API 호출 실패" });
  }
}
