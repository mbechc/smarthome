const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://192.168.88.5');
module.exports = client;
