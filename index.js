const mqttClient = require('./lib/mqttClient');
const { loadRules, handleRule } = require('./lib/ruleEngine');

console.log("[INIT] Loading rules...");
const rules = loadRules('./rules');
console.log(`[INIT] Loaded ${rules.length} rule(s)`);

mqttClient.on('connect', () => {
  console.log("[MQTT] Connected to broker");
  for (const rule of rules) {
    if (rule.triggerAsker.type === 'mqtt') {
      mqttClient.subscribe(rule.triggerAsker.topic, (err) => {
        if (err) {
          console.error(`[MQTT] Failed to subscribe to ${rule.triggerAsker.topic}:`, err);
        } else {
          console.log(`[MQTT] Subscribed to ${rule.triggerAsker.topic}`);
        }
      });
    }
  }
});

mqttClient.on('error', (err) => {
  console.error("[MQTT] Connection error:", err);
});

mqttClient.on('message', async (topic, message) => {
  const payload = message.toString();
  console.log(`[MQTT] Received message on topic '${topic}': ${payload}`);

  for (const rule of rules) {
    const asker = rule.triggerAsker;
    if (asker.type === 'mqtt' && topic === asker.topic && asker.match(payload)) {
      console.log(`[MATCH] Rule '${rule.id}' triggered by asker '${asker.id}'`);
      try {
        await handleRule(rule);
        console.log(`[ACTION] Rule '${rule.id}' executed successfully`);
      } catch (err) {
        console.error(`[ERROR] Rule '${rule.id}' execution failed:`, err);
      }
    }
  }
});