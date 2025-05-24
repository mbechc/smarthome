const mqttClient = require('../mqttClient');

async function publish(doer) {
  const payload = typeof doer.payload === 'string' ? doer.payload : JSON.stringify(doer.payload);
  mqttClient.publish(doer.address, payload);
}

module.exports = { publish };