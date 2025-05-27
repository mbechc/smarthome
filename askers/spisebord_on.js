module.exports = {
  id: 'spisebord_on',
  type: 'mqtt',
  topic: 'hue/spisebord/on',
  match: (payload) => payload === 'true' || payload === true
};