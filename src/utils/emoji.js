const emojiMap = {
  dinero: '💰',
  banco: '🏦',
  trabajo: '💼',
  perfil: '👤',
  nivel: '📈',
  inventario: '🎒',
  tiempo: '⏳',
  ayuda: '🆘',
  grupo: '👥',
  admin: '🔧',
  sticker: '🧩',
  musica: '🎶',
  video: '📹',
  imagen: '🖼️',
  menu: '📜',
  error: '❌',
  correcto: '✅',
  bot: '🤖',
  usuario: '👤',
  comandos: '💻',
  economia: '📊',
  juego: '🎮',
  waifu: '💞',
};

function getEmoji(keyword = '') {
  keyword = keyword.toLowerCase();
  return emojiMap[keyword] || '';
}

module.exports = { getEmoji };