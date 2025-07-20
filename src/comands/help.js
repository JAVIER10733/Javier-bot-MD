module.exports = {
    name: 'help',
    description: 'Muestra el menú de comandos disponibles',
    run: async ({ sock, msg, from }) => {
        const menu = `
📜 *Menú de Comandos*:
🔹 !info – Información del bot
🔹 !help – Este menú
🔹 !simi <texto> – Chat divertido con SimSimi
🔹 !tagall – Mencionar a todos (admin)
🔹 !kick <@usuario> – Expulsar del grupo

👑 ${new Date().toLocaleString()}
        `;
        await sock.sendMessage(from, { text: menu }, { quoted: msg });
    }
};