const mqtt = require('./methods/mqtt');
const http = require('./methods/http');

const methodMap = {
  'mqtt.publish': mqtt.publish,
  'http.get': http.get
};

async function invoke(doer) {
  const key = `${doer.type}.${doer.method}`;
  if (process.env.DRY_RUN === 'true') {
    console.log(`[DRY_RUN] Would invoke: ${doer.id} → ${key}`);
    return;
  }
  return await methodMap[key](doer);
}

module.exports = { invoke };