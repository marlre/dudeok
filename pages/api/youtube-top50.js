export default function handler(req, res) {
  res.status(200).json([{ "title": "YouTube Video 1", "thumbnail": "/sample.png", "views": 1000, "link": "#" }]);
}