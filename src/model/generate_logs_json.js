// Script to generate logs.json grouped by captain, with a unique lastCrisisDate per captain
import fs from 'fs';
import path from 'path';
import logs from './log.js';

function randomPastDate() {
  const daysAgo = Math.floor(Math.random() * 3650); // up to 10 years ago
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
}

// Group logs by captain
const captainMap = {};

for (const log of logs) {
  const key = log.captainName;
  if (!captainMap[key]) {
    captainMap[key] = {
      captainName: log.captainName,
      captainImage: log.captainImage,
      shipName: log.ship,
      shipImage: log.shipImage,
      lastCrisisDate: randomPastDate(),
      logs: []
    };
  }
  // Calculate daysSinceLastCrisis as the difference in days between log.date and lastCrisisDate
  const lastCrisisDate = captainMap[key].lastCrisisDate;
  const logDate = new Date(log.date);
  const crisisDate = new Date(lastCrisisDate);
  const msPerDay = 1000 * 60 * 60 * 24;
  const daysSinceLastCrisis = Math.floor((logDate - crisisDate) / msPerDay);
  const { id, date, location, title, logContent, mistakesWereMadeToday } = log;
  captainMap[key].logs.push({ id, date, location, title, logContent, mistakesWereMadeToday, daysSinceLastCrisis });
}

const output = Object.values(captainMap);
fs.writeFileSync(path.join(path.resolve(), 'src/model/logs.json'), JSON.stringify(output, null, 2));
console.log('logs.json generated with logs grouped by captain and unique lastCrisisDate per captain!');
