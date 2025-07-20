module.exports = async function autoReply(sock, msg) {
    const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text;
    const from = msg.key.remoteJid;

    if (!text) return;

    const lower = text.toLowerCase();

    if (lower.includes('hola')) {
        await sock.sendMessage(from, { text: '¡Hola! ¿Cómo estás?' }, { quoted: msg });
    }

    if (lower.includes('quién eres')) {
        await sock.sendMessage(from, { text: '🤖 Soy *Java-Bot-MD*, un bot creado por Ythan.' }, { quoted: msg });
    }
};