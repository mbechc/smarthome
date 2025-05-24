const asker = require('../askers/building1/roomA_motion1');
const luxSensor = require('../doers/outside/luxSensor1');
const light = require('../doers/buildingZ/roomB/lightbulb03');
const { get } = require('../lib/methods/http');
const { invoke } = require('../lib/invoke');

module.exports = {
  id: 'rule001',
  triggerAsker: asker,
  conditions: [
    async () => {
      const lux = await get(luxSensor);
      return lux < 50;
    }
  ],
  actions: [
    async () => {
      await invoke(light);
    }
  ]
};