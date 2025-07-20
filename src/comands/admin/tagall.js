module.exports = {
    name: 'tagall',
    description: 'Menciona a todos los miembros del grupo',
    run: async ({ sock, msg, from, isGroup }) => {
        if (!isGroup) return sock.sendMessage(from, { text: '❗ Solo se puede usar en grupos.' }, { quoted: msg });

        const metadata = await sock.groupMetadata(from);
        const members = metadata.participants.map(p => p.id);

        await sock.sendMessage(from, {
            text: '👥 Mencionando a todos:',
            mentions: members
        }, { quoted: msg });
    }
};