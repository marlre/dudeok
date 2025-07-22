export default function handler(req, res) {
  res.status(200).json([{ "title": "BMW 뉴스 1", "thumbnail": "/sample.png", "link": "#" }]);
}