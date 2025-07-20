const fs = require('fs');
const path = require('path');
const { logger } = require('../../lib/logger');
const { getCommandBody } = require('../utils/tools');
const settings = require('../../config/settings');

const prefixRegex = new RegExp(`^(${settings.prefix.join('|')})`, 'i');

// Cargar comandos automáticamente
const commands = new Map();
const commandFolders = ['.', 'fun', 'admin'];
for (const folder of commandFolders) {
    const dirPath = path.join(__dirname, '..', 'commands', folder);
    if (fs.existsSync(dirPath)) {
        for (const file of fs.readdirSync(dirPath).filter(f => f.endsWith('.js'))) {
            const cmd = require(path.join(dirPath, file));
            if (cmd.name) commands.set(cmd.name.toLowerCase(), cmd);
        }
    }
}
ai: {
  enabled: true,
  openaiKey: 'TU_CLAVE_OPENAI_AQUI'
}
async function handleIncomingMessage(sock, msg) {
    try {
        const from = msg.key.remoteJid;
        const sender = msg.key.participant || msg.key.remoteJid;
        const isGroup = from.endsWith('@g.us');
        const messageType = Object.keys(msg.message)[0];
        const content = msg.message.conversation || msg.message.extendedTextMessage?.text || '';
        const prefix = prefixRegex.exec(content)?.[0];

        if (!prefix) return;

        const body = content.slice(prefix.length).trim();
        const args = body.split(/\s+/);
        const commandName = args.shift().toLowerCase();

        const command = commands.get(commandName);
        if (command) {
            logger.info(`Comando detectado: ${commandName}`);
            await command.run({ sock, msg, args, from, sender, isGroup });
        }
    } catch (e) {
        logger.error(`Error al manejar mensaje: ${e}`);
    }
}

module.exports = { handleIncomingMessage };