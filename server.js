const express = require("express");
const app = express();
const ytdl = require("ytdl-core");
const cors = require("cors");

app.use(cors());

app.get("/formats", async (req, res) => {
  const videoID = req.query.videoID;
  const options = {
    quality: req.query.quality,
    filter: req.query.filter,
  };
  try {
    const info = await ytdl.getInfo(videoID);
    const formats = ytdl.chooseFormat(info.formats, options);
    res.json(formats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/download", async (req, res) => {
  const videoID = req.query.videoID;
  const formatItag = req.query.format;
  
  if (!videoID || !formatItag) {
    return res.status(400).json({ error: 'VideoID and format are required' });
  }

  try {
    const info = await ytdl.getInfo(videoID);
    // Convert formatItag to number since itag is stored as number
    const format = info.formats.find(f => f.itag === parseInt(formatItag));
    
    if (!format) {
      console.log('Available formats:', info.formats.map(f => f.itag));
      console.log('Requested format:', formatItag);
      throw new Error(`Format with itag ${formatItag} not found`);
    }

    // Set headers for streaming
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="${info.videoDetails.title}.${format.container}"`);
    res.setHeader('Transfer-Encoding', 'chunked');
    res.setHeader('X-Content-Length', format.contentLength);
    
    // Create stream with specific format
    const stream = ytdl(videoID, {
      format: format,
      requestOptions: {
        headers: {
          'Accept': '*/*',
          'Accept-Encoding': 'gzip, deflate, br',
          'Range': 'bytes=0-',
          'Connection': 'keep-alive'
        }
      }
    });
    
    // Pipe the stream to response
    stream.pipe(res);
    
    // Handle errors
    stream.on('error', (error) => {
      console.error('Stream error:', error);
      if (!res.headersSent) {
        res.status(500).json({ error: error.message });
      }
    });

    // Handle end of stream
    stream.on('end', () => {
      console.log('Download completed for format:', format.itag);
    });

  } catch (err) {
    console.error('Download error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
