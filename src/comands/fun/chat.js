const { askOpenAI } = require('../../services/openai');

module.exports = {
  name: 'chat',
  description: 'Chat con IA de OpenAI',
  run: async ({ sock, msg, from, args }) => {
    if (!args.length) return sock.sendMessage(from, { text: '❗ Usa: !chat <tu pregunta>' }, { quoted: msg });

    const prompt = args.join(' ');
    try {
      const reply = await askOpenAI(prompt);
      await sock.sendMessage(from, { text: reply }, { quoted: msg });
    } catch (error) {
      await sock.sendMessage(from, { text: '⚠️ Error al conectar con OpenAI.' }, { quoted: msg });
    }
  }
};