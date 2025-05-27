const mqtt = require('mqtt');
require('dotenv').config();

const brokerUrl = process.env.MQTT_BROKER || 'mqtt://localhost';
console.log(`[MQTT] Connecting to broker at ${brokerUrl}`);
const client = mqtt.connect(brokerUrl);

module.exports = client;
