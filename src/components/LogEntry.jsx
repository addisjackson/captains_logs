import React, { useState } from 'react';
import UpdateForm from './UpdateForm';

function LogEntry({ log, onUpdate }) {
  const [isEditing, setEditing] = useState(false);

  const handleEditClick = () => {
    setEditing(true);
  };

  return (
    <div className="log-entry">
      {isEditing ? (
        <UpdateForm log={log} onUpdate={onUpdate} />
      ) : (
        <div>
          <h2>{log.captainName}</h2>
          <p>Date: {log.date}</p>
          <p>Location: {log.location}</p>
          <p>Ship: {log.shipName}</p>
          <p>Title: {log.title}</p>
          <p>Content: {log.logContent}</p>
          <p>Mistake Today: {log.mistakesWereMadeToday ? 'Yes' : 'No'}</p>
          <img src={log.photoURL} alt="Log" />
          <button onClick={handleEditClick}>Edit</button>
        </div>
      )}
    </div>
  );
}

export default LogEntry;
