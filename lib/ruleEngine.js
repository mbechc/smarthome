const fs = require('fs');
const path = require('path');
const { invoke } = require('./invoke');

function loadRules(dir) {
  const rules = [];
  function readRecursive(currentPath) {
    const entries = fs.readdirSync(currentPath);
    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        readRecursive(fullPath);
      } else if (entry.endsWith('.js')) {
        const rule = require(fullPath);
        rules.push(rule);
      }
    }
  }
  readRecursive(path.resolve(dir));
  return rules;
}

async function handleRule(rule) {
  const passed = await Promise.all(rule.conditions.map(fn => fn()));
  if (passed.every(Boolean)) {
    for (const action of rule.actions) await action();
  }
}

module.exports = { loadRules, handleRule };