const express = require('express')
const ytdlp = require('ytdlp-nodejs')
const path = require('path')
// const url = "https://www.youtube.com/watch?v=Qzc_aX8c8g4";

const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, 'public')))

app.get('/info', async (req, res) => {// download video
  const url = req.query.url
  const getInfo = ytdlp.thumbnail(url);
  const info = await getInfo;
  console.log(info)
  res.json(info)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
