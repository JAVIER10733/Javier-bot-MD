const { useMultiFileAuthState, DisconnectReason, makeWASocket } = require('@whiskeysockets/baileys');
const pino = require('pino');
const { logger } = require('../../lib/logger');

let sock;
let state, saveCreds;

async function createSession() {
  const auth = await useMultiFileAuthState('./session/credentials');
  state = auth.state;
  saveCreds = auth.saveCreds;

  sock = makeWASocket({
    auth: state,
    logger: pino({ level: 'silent' }),
    printQRInTerminal: true,
    browser: ['Java-Bot', 'Chrome', '1.0.0'],
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === 'close') {
      const statusCode = lastDisconnect?.error?.output?.statusCode;
      const reason = DisconnectReason[statusCode] || 'Desconocido';
      logger.warn(`Conexión cerrada: ${reason}`);

      if (statusCode !== DisconnectReason.loggedOut) {
        logger.info('Intentando reconectar...');
        createSession();
      } else {
        logger.error('Sesión cerrada, por favor vuelve a escanear el QR.');
      }
    } else if (connection === 'open') {
      logger.info('✅ Conexión exitosa con WhatsApp!');
    }
  });

  return sock;
}

module.exports = { createSession };