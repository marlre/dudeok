
import fetch from 'node-fetch';

export default async function handler(req, res) {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const baseURL = "https://www.googleapis.com/youtube/v3/search";

  const params = new URLSearchParams({
    part: "snippet",
    q: "shorts",
    type: "video",
    maxResults: 30,  // 더 많이 가져와서 필터링
    order: "viewCount",
    videoDuration: "short",  // 4분 이하
    key: apiKey,
  });

  try {
    const response = await fetch(`${baseURL}?${params}`);
    const data = await response.json();

    // 1분 미만 영상만 필터링
    const videoIds = data.items.map(item => item.id.videoId).join(',');
    const videoDetailsURL = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics,snippet&id=${videoIds}&key=${apiKey}`;
    const detailsResponse = await fetch(videoDetailsURL);
    const detailsData = await detailsResponse.json();

    const shorts = detailsData.items
      .filter(video => {
        const duration = video.contentDetails.duration;
        const match = duration.match(/PT(\d+)M?(\d*)S?/);
        const minutes = match ? parseInt(match[1] || "0") : 0;
        const seconds = match ? parseInt(match[2] || "0") : 0;
        return (minutes === 0 && seconds < 60);  // 1분 미만
      })
      .slice(0, 10);  // Top 10만

    res.status(200).json({ items: shorts });
  } catch (error) {
    console.error("Error fetching YouTube shorts:", error);
    res.status(500).json({ error: "Failed to fetch YouTube shorts" });
  }
}
