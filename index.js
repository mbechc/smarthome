const mqttClient = require('./lib/mqttClient');
const cron = require('node-cron');
const { loadRules, handleRule } = require('./lib/ruleEngine');

const rules = loadRules('./rules');

// Scheduler askers
for (const rule of rules) {
  const asker = rule.triggerAsker;
  if (asker.type === 'schedule' && asker.cron) {
    cron.schedule(asker.cron, async () => {
      console.log(`[SCHEDULE] Rule ${rule.id} triggered by ${asker.id}`);
      await handleRule(rule);
    });
  }
}

// MQTT askers
mqttClient.on('message', async (topic, message) => {
  const payload = JSON.parse(message.toString());
  for (const rule of rules) {
    const { triggerAsker } = rule;
    if (triggerAsker.type === 'mqtt' &&
        triggerAsker.topic === topic &&
        triggerAsker.match(payload)) {
      console.log(`[MQTT] Rule ${rule.id} triggered by ${triggerAsker.id}`);
      await handleRule(rule);
    }
  }
});