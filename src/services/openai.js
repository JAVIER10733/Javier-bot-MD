const axios = require('axios');
const settings = require('../../config/settings');

async function askOpenAI(prompt) {
  if (!settings.ai.enabled) throw new Error('IA desactivada en configuración.');
  if (!settings.ai.openaiKey) throw new Error('No se ha definido la API Key de OpenAI.');

  const response = await axios.post('https://api.openai.com/v1/chat/completions', {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 150,
  }, {
    headers: {
      'Authorization': `Bearer ${settings.ai.openaiKey}`,
      'Content-Type': 'application/json',
    }
  });

  return response.data.choices[0].message.content.trim();
}

module.exports = { askOpenAI };