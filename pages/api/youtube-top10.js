export default async function handler(req, res) {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const maxResults = 10;
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&order=viewCount&type=video&videoDuration=short&regionCode=KR&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch YouTube data', details: error.message });
  }
}
