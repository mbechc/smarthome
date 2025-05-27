const mqtt = require('mqtt');
require('dotenv').config({ path: '/config/automation.env' });  // Load from volume mount

const brokerUrl = process.env.MQTT_BROKER || 'mqtt://localhost';
console.log(`[MQTT] Connecting to broker at ${brokerUrl}`);
const client = mqtt.connect(brokerUrl);

module.exports = client;
