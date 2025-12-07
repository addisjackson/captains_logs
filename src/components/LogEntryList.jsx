import React from 'react';

function LogEntryList({ logs, showLog }) {
  return (
    <ul>
      {logs.map((log) => (
        <li key={log.id} onClick={() => showLog(log.id)}>
          {log.title}
        </li>
      ))}
    </ul>
  );
}

export default LogEntryList;
