const asker = require('../askers/spisebord_on');
const doer = require('../doers/spisebordGroup');
const { put } = require('../lib/methods/http');

module.exports = {
  id: 'rule_spisebord_on',
  triggerAsker: asker,
  conditions: [],
  actions: [
    async () => {
      await put(doer);
    }
  ]
};