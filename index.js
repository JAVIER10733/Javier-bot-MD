const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const pino = require('pino');
const path = require('path');
const fs = require('fs');
const terminalImage = require('terminal-image');
const { GifCodec } = require('gifwrap');
const { handleIncomingMessage } = require('./src/client/handler');
const { createSession } = require('./src/client/sessionManager');
const { logger } = require('./lib/logger');
const welcomeHandler = require('./plugins/welcome_handler');
const autoReply = require('./plugins/auto_reply');

async function showBotGif() {
    try {
        const gifPath = path.join(__dirname, 'media', 'bot_image.gif');
        const gifData = fs.readFileSync(gifPath);

        const codec = new GifCodec();
        const gif = await codec.decodeGif(gifData);
        const frame = gif.frames[0].bitmap;

        const imageBuffer = Buffer.from(frame.data);
        const width = frame.width;
        const height = frame.height;

        const display = await terminalImage.buffer(imageBuffer, {
            width: '30%',
            height: '30%',
        });

        console.log(display);
    } catch (err) {
        console.log('⚠️ No se pudo mostrar la imagen del bot:', err.message);
    }
}

async function startBot() {
    await showBotGif();

    const sock = await createSession();

    sock.ev.on('creds.update', sock.auth.saveCreds);

    sock.ev.on('messages.upsert', async ({ messages, type }) => {
        if (type !== 'notify') return;
        const msg = messages[0];
        if (!msg.message) return;

        await autoReply(sock, msg); // respuesta automática
        await handleIncomingMessage(sock, msg);
    });

    sock.ev.on('group-participants.update', async (update) => {
        await welcomeHandler(sock, update);
    });

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const reason = lastDisconnect?.error?.output?.statusCode;
            logger.warn(`Conexión cerrada, razón: ${reason}`);
            startBot(); // reconexión automática
        } else if (connection === 'open') {
            logger.info('✅ Bot conectado a WhatsApp correctamente.');
        }
    });
}

startBot();