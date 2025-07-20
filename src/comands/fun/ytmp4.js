const ytdl = require('ytdl-core');
const path = require('path');
const fs = require('fs');

module.exports = {
  name: 'ytmp4',
  description: 'Descarga video de YouTube y lo envía',
  run: async ({ sock, msg, from, args }) => {
    if (!args.length) return sock.sendMessage(from, { text: '❗ Usa: !ytmp4 <url de YouTube>' }, { quoted: msg });

    const url = args[0];
    if (!ytdl.validateURL(url)) {
      return sock.sendMessage(from, { text: '❗ URL de YouTube no válida.' }, { quoted: msg });
    }

    const outputPath = path.join(__dirname, '../../storage/temp', `${Date.now()}.mp4`);

    try {
      const videoStream = ytdl(url, { quality: 'highestvideo' });
      const writeStream = fs.createWriteStream(outputPath);

      videoStream.pipe(writeStream);

      writeStream.on('finish', async () => {
        const buffer = fs.readFileSync(outputPath);
        await sock.sendMessage(from, { video: buffer, mimetype: 'video/mp4' }, { quoted: msg });
        fs.unlinkSync(outputPath);
      });

      writeStream.on('error', async (err) => {
        await sock.sendMessage(from, { text: '⚠️ Error al descargar el video.' }, { quoted: msg });
      });
    } catch (error) {
      await sock.sendMessage(from, { text: '⚠️ Error inesperado.' }, { quoted: msg });
    }
  }
};