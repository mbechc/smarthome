const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost');
module.exports = client;