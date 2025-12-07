// This script is for one-time use to export logs from logs.js to logs.json
// Run this in a Node.js environment if you want to generate the JSON file from the JS data.

const fs = require('fs');
const logs = require('./log').default;

fs.writeFileSync('logs.json', JSON.stringify(logs, null, 2));
console.log('logs.json created!');
