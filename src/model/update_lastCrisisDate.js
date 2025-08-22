// This script updates logs.json so that each captain has a unique random lastCrisisDate, and all their logs share that date.
// Run with: node update_lastCrisisDate.js

import fs from 'fs';

const filePath = './src/model/logs.json';
const logs = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

// Get all unique captains
const captains = [...new Set(logs.map(log => log.captainName))];

// Generate a random date in the last 10 years for each captain
function randomDate() {
  const start = new Date();
  start.setFullYear(start.getFullYear() - 10);
  const end = new Date();
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().slice(0, 10);
}

const captainDates = {};
captains.forEach(captain => {
  captainDates[captain] = randomDate();
});

// Update logs
logs.forEach(log => {
  log.lastCrisisDate = captainDates[log.captainName];
});

fs.writeFileSync(filePath, JSON.stringify(logs, null, 2));

console.log('Updated lastCrisisDate for each captain in logs.json');
