const express = require("express");
const path = require("path");
const YTDlpWrap = require("yt-dlp-wrap").default;

// Create yt-dlp wrapper instance
const ytDlpWrap = new YTDlpWrap("./yt-dlp"); // Provide the relative path to the binary

const app = express();

// Serve static files (for the frontend)
app.use(express.static(path.join(__dirname, "public")));

// Endpoint to fetch video metadata
app.get("/info", async (req, res) => {
  const videoUrl = req.query.url;
  try {
    let metadata = await ytDlpWrap.getVideoInfo(videoUrl);

    // Find a format with both video and audio
    const videoWithAudio = metadata.formats.find(
      (format) => format.acodec !== "none" && format.vcodec !== "none"
    );

    if (videoWithAudio) {
      // console.log("Video URL with audio:", videoWithAudio.url);
      res.json({
        audio: metadata.formats.filter(
          (format) =>
            format.acodec === "opus" && format.format_note.includes("medium")
        ), // List audio formats
        video: metadata.formats.filter((format) => format.vcodec !== "none"), // List video formats
      });
    } else {
      res.status(404).json({ error: "No audio-video format found." });
    }
  } catch (error) {
    console.error("Error fetching video metadata:", error);
    res.status(500).json({ error: "Error fetching video metadata" });
  }
});

// Endpoint to download audio

// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
