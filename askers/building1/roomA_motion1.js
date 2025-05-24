module.exports = {
  id: 'roomA_motion1',
  type: 'mqtt',
  topic: 'zigbee2mqtt/roomA_motion1',
  match: (payload) => payload.action === 'single'
};