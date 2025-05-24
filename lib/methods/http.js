const axios = require('axios');

async function get(doer) {
  const response = await axios.get(doer.address);
  const result = doer.extract ? doer.extract(response.data) : response.data;
  return result;
}

module.exports = { get };