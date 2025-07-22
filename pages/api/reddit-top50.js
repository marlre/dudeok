export default function handler(req, res) {
  res.status(200).json([{ "title": "Reddit Post 1", "thumbnail": "/sample.png", "views": 500, "link": "#" }]);
}