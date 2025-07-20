const respuestas = [
    '¿En serio? 😂',
    'No sé qué decirte...',
    'Mejor pregúntale a tu abuelita 😅',
    'Eso suena sospechoso 👀',
    'JAJA buena esa!',
    'Te estás pasando, bro 🤨',
    'Me caes bien, sigue hablando 🫶'
];

module.exports = {
    name: 'simi',
    description: 'Responde de forma divertida',
    run: async ({ sock, msg, from, args }) => {
        if (!args.length) return sock.sendMessage(from, { text: '❗ Usa: !simi <texto>' }, { quoted: msg });
        const respuesta = respuestas[Math.floor(Math.random() * respuestas.length)];
        await sock.sendMessage(from, { text: respuesta }, { quoted: msg });
    }
};