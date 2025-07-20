const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const fs = require('fs');
const path = require('path');

ffmpeg.setFfmpegPath(ffmpegPath);

async function downloadAudio(url, outputPath) {
  return new Promise((resolve, reject) => {
    const stream = ytdl(url, { filter: 'audioonly' });
    ffmpeg(stream)
      .audioBitrate(128)
      .save(outputPath)
      .on('end', () => resolve(outputPath))
      .on('error', (err) => reject(err));
  });
}

async function validateYouTubeUrl(url) {
  return ytdl.validateURL(url);
}

module.exports = { downloadAudio, validateYouTubeUrl };