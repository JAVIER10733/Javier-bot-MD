const axios = require('axios');

async function getJSON(url, headers = {}) {
  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener JSON de ${url}: ${error.message}`);
  }
}

async function postJSON(url, data = {}, headers = {}) {
  try {
    const response = await axios.post(url, data, { headers });
    return response.data;
  } catch (error) {
    throw new Error(`Error al hacer POST a ${url}: ${error.message}`);
  }
}

module.exports = { getJSON, postJSON };