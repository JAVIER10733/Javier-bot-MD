function formatDuration(ms) {
  const sec = Math.floor(ms / 1000) % 60;
  const min = Math.floor(ms / (1000 * 60)) % 60;
  const hr = Math.floor(ms / (1000 * 60 * 60)) % 24;
  const day = Math.floor(ms / (1000 * 60 * 60 * 24));

  return `${day}d ${hr}h ${min}m ${sec}s`;
}

function getCurrentTime(format = 'full') {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');

  if (format === 'hh:mm') return `${hours}:${minutes}`;
  if (format === 'hh:mm:ss') return `${hours}:${minutes}:${seconds}`;

  const day = now.getDate().toString().padStart(2, '0');
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const year = now.getFullYear();

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

function uptime() {
  const now = Date.now();
  const up = process.uptime() * 1000;
  return formatDuration(up);
}

module.exports = {
  formatDuration,
  getCurrentTime,
  uptime,
};