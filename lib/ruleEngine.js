const fs = require('fs');
const path = require('path');

// Path to the rules directory relative to the current working directory
const RULES_DIR = path.join(process.cwd(), 'rules');

// Helper to recursively read all .js files in rules directory
function readRecursive(dir) {
  let results = [];

  if (!fs.existsSync(dir)) {
    console.warn(`Rules directory not found: ${dir}`);
    return results;
  }

  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat && stat.isDirectory()) {
      results = results.concat(readRecursive(fullPath));
    } else if (file.endsWith('.js')) {
      results.push(fullPath);
    }
  });

  return results;
}

// Load all rules and export them as a single array
function loadRules() {
  const ruleFiles = readRecursive(RULES_DIR);
  console.log(`Loading ${ruleFiles.length} rule(s) from ${RULES_DIR}`);

  const rules = [];

  for (const file of ruleFiles) {
    try {
      const rule = require(file);
      rules.push(rule);
    } catch (err) {
      console.error(`Failed to load rule file ${file}:`, err);
    }
  }

  return rules;
}

module.exports = {
  loadRules
};
