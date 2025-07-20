module.exports = {
    name: 'kick',
    description: 'Expulsa a un miembro del grupo (usa @)',
    run: async ({ sock, msg, from, isGroup }) => {
        if (!isGroup) return sock.sendMessage(from, { text: '❗ Este comando solo funciona en grupos.' }, { quoted: msg });

        const mentions = msg.message.extendedTextMessage?.contextInfo?.mentionedJid;
        if (!mentions || mentions.length === 0) {
            return sock.sendMessage(from, { text: '❗ Menciona al usuario que deseas expulsar.' }, { quoted: msg });
        }

        await sock.groupParticipantsUpdate(from, mentions, 'remove');
        await sock.sendMessage(from, { text: `✅ Usuario expulsado.` }, { quoted: msg });
    }
};