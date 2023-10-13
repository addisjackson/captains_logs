import React from 'react';
import LogEntry from './LogEntry';

function LogList({ logs, filters, searchQuery }) {
  // Filter the logs based on selected filters
  const filteredLogs = logs
    .filter((log) => {
      if (filters.mistakes) {
        return log.mistakesWereMadeToday === filters.mistakes;
      }
      return true;
    })
    .filter((log) => {
      if (filters.lastCrisis) {
        switch (filters.lastCrisisOperator) {
          case 'gt':
            return log.daysSinceLastCrisis > filters.lastCrisis;
          case 'gte':
            return log.daysSinceLastCrisis >= filters.lastCrisis;
          case 'lt':
            return log.daysSinceLastCrisis < filters.lastCrisis;
          case 'lte':
            return log.daysSinceLastCrisis <= filters.lastCrisis;
          default:
            return true;
        }
      }
      return true;
    });

  // Filter the logs based on the search query
  const searchedLogs = searchQuery
    ? filteredLogs.filter(
        (log) =>
          log.captainName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          log.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          log.logContent.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredLogs;

  return (
    <div className="log-list">
      {searchedLogs.map((log) => (
        <LogEntry key={log.id} log={log} />
      ))}
    </div>
  );
}

export default LogList;
