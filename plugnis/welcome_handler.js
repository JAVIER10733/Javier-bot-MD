module.exports = async function welcomeHandler(sock, update) {
    const { id, participants, action } = update;

    if (action === 'add') {
        for (const participant of participants) {
            const name = participant.split('@')[0];
            const welcomeMessage = `👋 ¡Bienvenido/a @${name} al grupo! Lee las reglas y diviértete.`;
            await sock.sendMessage(id, {
                text: welcomeMessage,
                mentions: [participant]
            });
        }
    }
};