async function sendText(sock, jid, text, quoted) {
  return await sock.sendMessage(jid, { text }, { quoted });
}

async function sendImage(sock, jid, imageBuffer, caption = '', quoted) {
  return await sock.sendMessage(jid, { image: imageBuffer, caption }, { quoted });
}

async function sendSticker(sock, jid, stickerBuffer, quoted) {
  return await sock.sendMessage(jid, { sticker: stickerBuffer }, { quoted });
}

module.exports = {
  sendText,
  sendImage,
  sendSticker,
};