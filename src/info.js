const settings = require('../../config/settings');

module.exports = {
    name: 'info',
    description: 'Muestra información básica del bot',
    run: async ({ sock, msg, from }) => {
        const infoText = `🤖 *${settings.botName}*\n👑 Dueño: ${settings.ownerName}\n✅ Estado: Activo\n📍 Hecho con Baileys`;
        await sock.sendMessage(from, { text: infoText }, { quoted: msg });
    }
};