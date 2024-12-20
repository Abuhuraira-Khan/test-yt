const express = require('express');
const path = require('path');
const ytdl = require('ytdl-core');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/info', async (req, res) => {
  const url = req.query.url;

  try {
    const info = await ytdl.getBasicInfo(url);
    console.log(info);
    res.json(info);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching video information' });
  }

})

app.listen(3000, () => {
  console.log('Server started on port 3000');
});