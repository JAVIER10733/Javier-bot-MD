const { getEmoji } = require('../utils/emoji');
const { getCurrentTime } = require('../utils/time');
const config = require('../../config');

function classicMenu({ sender, prefix, pushName }) {
  const hora = getCurrentTime('hh:mm:ss');
  const nombreUsuario = pushName || 'Usuario';

  return `
╭══🎩 *${config.botName}* 🎩═══╮
│👤 *Usuario:* ${nombreUsuario}
│🕒 *Hora:* ${hora}
│⚙️ *Modo:* Público
│📍 *Prefix:* [ ${prefix} ]
╰═════════════════╯

╭───${getEmoji('menu')} *MENÚ PRINCIPAL* ───╮
│${getEmoji('ayuda')} *${prefix}menu*
│${getEmoji('perfil')} *${prefix}perfil*
│${getEmoji('nivel')} *${prefix}nivel*
│${getEmoji('inventario')} *${prefix}inventario*
╰────────────────────────────╯

╭───${getEmoji('admin')} *ADMINISTRACIÓN* ───╮
│${getEmoji('grupo')} *${prefix}add @tag*
│${getEmoji('grupo')} *${prefix}kick @tag*
│${getEmoji('grupo')} *${prefix}promote @tag*
│${getEmoji('grupo')} *${prefix}demote @tag*
│${getEmoji('grupo')} *${prefix}tagall*
╰─────────────────────────────╯

╭────${getEmoji('economia')} *ECONOMÍA* ────╮
│${getEmoji('trabajo')} *${prefix}work*
│${getEmoji('dinero')} *${prefix}bank*
│${getEmoji('dinero')} *${prefix}rob @tag*
│${getEmoji('dinero')} *${prefix}buy*
│${getEmoji('dinero')} *${prefix}sell*
╰────────────────────────────╯

╭─────${getEmoji('musica')} *MÚSICA & MEDIA* ─────╮
│${getEmoji('musica')} *${prefix}play <nombre>*
│${getEmoji('video')} *${prefix}ytmp4 <link>*
│${getEmoji('imagen')} *${prefix}img <texto>*
│${getEmoji('gif')} *${prefix}gif <nombre>*
╰──────────────────────────────╯

╭────${getEmoji('waifu')} *DIVERSIÓN* ────╮
│${getEmoji('waifu')} *${prefix}waifu*
│${getEmoji('bot')} *${prefix}simi <texto>*
│${getEmoji('juego')} *${prefix}trollear*
│${getEmoji('juego')} *${prefix}insulto*
╰────────────────────────────╯

╭────${getEmoji('comandos')} *OTROS COMANDOS* ───╮
│${getEmoji('translate')} *${prefix}traducir <txt>*
│${getEmoji('bot')} *${prefix}openai <pregunta>*
│${getEmoji('weather')} *${prefix}clima <ciudad>*
│${getEmoji('bot')} *${prefix}ping*
╰──────────────────────────────╯

🧠 *Desarrollado por:* ${config.botOwner}
🌐 *Repositorio:* github.com/${config.repo || 'tu-repo-aqui'}

_${config.botName} siempre activo para ti 😎_
`;
}

module.exports = classicMenu;