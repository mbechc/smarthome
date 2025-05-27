const mqttClient = require('./lib/mqttClient');
const { loadRules, handleRule } = require('./lib/ruleEngine');

const rules = loadRules('./rules');

mqttClient.on('message', async (topic, message) => {
  const payload = message.toString();
  for (const rule of rules) {
    const asker = rule.triggerAsker;
    if (asker.type === 'mqtt' && topic === asker.topic && asker.match(payload)) {
      console.log(`[MATCH] Triggered rule: ${rule.id}`);
      await handleRule(rule);
    }
  }
});

mqttClient.on('connect', () => {
  for (const rule of rules) {
    if (rule.triggerAsker.type === 'mqtt') {
      mqttClient.subscribe(rule.triggerAsker.topic);
      console.log(`[SUBSCRIBE] ${rule.triggerAsker.topic}`);
    }
  }
});