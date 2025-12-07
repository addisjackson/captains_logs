
import React from 'react';

function CrisisCounter({ logs }) {
  // Pick a random log as the last crisis
  const crisisLogs = logs.filter(log => log.mistakesWereMadeToday);
  let lastCrisisDate = null;
  if (crisisLogs.length > 0) {
    lastCrisisDate = crisisLogs[Math.floor(Math.random() * crisisLogs.length)].date;
  }
  let daysSinceLastCrisis = null;
  if (lastCrisisDate) {
    const last = new Date(lastCrisisDate);
    const now = new Date();
    daysSinceLastCrisis = Math.floor((now - last) / (1000 * 60 * 60 * 24));
  }
  return (
    <div className="crisis-counter">
      <h2>Days Since Last Crisis:</h2>
      <div className="counter">{daysSinceLastCrisis !== null ? daysSinceLastCrisis : 'N/A'}</div>
      {lastCrisisDate && <div style={{ fontSize: '0.9rem', color: '#666' }}>Last crisis: {lastCrisisDate}</div>}
    </div>
  );
}

export default CrisisCounter;
