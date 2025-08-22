import initialLogs from './logs.json';

const STORAGE_KEY = 'captainsLogs';

export function initLogs() {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialLogs));
  }
}

export function getAllCaptainLogs() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function getCaptainLogById(captainName, logId) {
  const logs = getAllCaptainLogs();
  const captain = logs.find(c => c.captainName === captainName);
  if (!captain) return null;
  return captain.logs.find(l => l.id === logId);
}

export function addCaptainLog(captainName, newLog, captainData) {
  const logs = getAllCaptainLogs();
  let captain = logs.find(c => c.captainName === captainName);
  if (!captain) {
    captain = {
      captainName,
      captainImage: captainData.captainImage,
      shipName: captainData.shipName,
      shipImage: captainData.shipImage,
      lastCrisisDate: new Date().toISOString().split('T')[0],
      logs: []
    };
    logs.push(captain);
  }
  captain.logs.push(newLog);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
}

export function updateCaptainLogById(captainName, logId, updatedLog) {
  const logs = getAllCaptainLogs();
  const captain = logs.find(c => c.captainName === captainName);
  if (!captain) return;
  const logIndex = captain.logs.findIndex(l => l.id === logId);
  if (logIndex === -1) return;
  captain.logs[logIndex] = updatedLog;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
}

export function removeCaptainLog(captainName, logId) {
  const logs = getAllCaptainLogs();
  const captain = logs.find(c => c.captainName === captainName);
  if (!captain) return;
  captain.logs = captain.logs.filter(l => l.id !== logId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
}

// ------------------------------
// SEARCH, FILTER, SORT LOGIC
// ------------------------------

/**
 * Search logs by keyword across title, content, or location
 * @param {string} captainName
 * @param {string} keyword
 * @returns {Array}
 */
export function searchCaptainLogs(captainName, keyword) {
  const logs = getCaptainLogsArray(captainName);
  if (!logs) return [];
  const lower = keyword.toLowerCase();
  return logs.filter(
    l =>
      l.logTitle.toLowerCase().includes(lower) ||
      l.logContent.toLowerCase().includes(lower) ||
      l.location.toLowerCase().includes(lower)
  );
}

/**
 * Filter logs by mistakes flag or date range
 * @param {string} captainName
 * @param {Object} options - { mistakesWereMadeToday, startDate, endDate }
 * @returns {Array}
 */
export function filterCaptainLogs(captainName, options = {}) {
  const logs = getCaptainLogsArray(captainName);
  if (!logs) return [];

  return logs.filter(l => {
    let match = true;
    if (options.mistakesWereMadeToday !== undefined) {
      match = match && l.mistakesWereMadeToday === options.mistakesWereMadeToday;
    }
    if (options.startDate) {
      match = match && new Date(l.date) >= new Date(options.startDate);
    }
    if (options.endDate) {
      match = match && new Date(l.date) <= new Date(options.endDate);
    }
    return match;
  });
}

/**
 * Sort logs by date or days since last crisis
 * @param {Array} logs
 * @param {string} sortBy - 'date' | 'daysSinceLastCrisis'
 * @param {string} order - 'asc' | 'desc'
 * @returns {Array}
 */
export function sortLogs(logs, sortBy = 'date', order = 'asc') {
  const sorted = [...logs].sort((a, b) => {
    let aVal = sortBy === 'date' ? new Date(a.date) : a[sortBy];
    let bVal = sortBy === 'date' ? new Date(b.date) : b[sortBy];
    if (aVal < bVal) return order === 'asc' ? -1 : 1;
    if (aVal > bVal) return order === 'asc' ? 1 : -1;
    return 0;
  });
  return sorted;
}

/**
 * Helper: get logs array for captain
 */
function getCaptainLogsArray(captainName) {
  const allLogs = getAllCaptainLogs();
  const captain = allLogs.find(c => c.captainName === captainName);
  return captain ? captain.logs : null;
}
