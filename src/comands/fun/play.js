const { downloadAudio, validateYouTubeUrl } = require('../../services/yt-api');
const path = require('path');
const fs = require('fs');

module.exports = {
  name: 'play',
  description: 'Descarga audio de YouTube y envía como nota de voz',
  run: async ({ sock, msg, from, args }) => {
    if (!args.length) return sock.sendMessage(from, { text: '❗ Usa: !play <url de YouTube>' }, { quoted: msg });

    const url = args[0];
    if (!await validateYouTubeUrl(url)) {
      return sock.sendMessage(from, { text: '❗ URL de YouTube no válida.' }, { quoted: msg });
    }

    const outputPath = path.join(__dirname, '../../storage/temp', `${Date.now()}.mp3`);

    try {
      await downloadAudio(url, outputPath);

      const buffer = fs.readFileSync(outputPath);
      await sock.sendMessage(from, { audio: buffer, mimetype: 'audio/mpeg', ptt: true }, { quoted: msg });

      fs.unlinkSync(outputPath); // borrar archivo temporal
    } catch (err) {
      await sock.sendMessage(from, { text: '⚠️ Error al descargar el audio.' }, { quoted: msg });
    }
  }
};