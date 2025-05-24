const fs = require('fs');
const path = require('path');

const CONFIG_PATH = path.join(process.cwd(), 'config', 'settings.json');

function ensureConfigDir() {
  const dir = path.dirname(CONFIG_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function loadSettings() {
  try {
    if (fs.existsSync(CONFIG_PATH)) {
      return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
    }
  } catch (err) {
    console.error('Failed to load settings:', err);
  }
  return {}; // default empty config
}

function saveSettings(newSettings) {
  ensureConfigDir();
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(newSettings, null, 2), 'utf8');
}

module.exports = {
  loadSettings,
  saveSettings,
};
