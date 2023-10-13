import React, { useState } from 'react';

function UpdateForm({ log, onUpdate }) {
  const [updatedLog, setUpdatedLog] = useState({
    captainName: log.captainName,
    date: log.date,
    location: log.location,
    shipName: log.shipName,
    title: log.title,
    logContent: log.logContent,
    mistakesWereMadeToday: log.mistakesWereMadeToday,
    photoURL: log.photoURL,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUpdatedLog({
      ...updatedLog,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the onUpdate function with the updated log
    onUpdate(log.id, updatedLog);
  };

  return (
    <form onSubmit={handleSubmit} className="update-form">
      <label>
        Captain Name:
        <input
          type="text"
          name="captainName"
          value={updatedLog.captainName}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Date:
        <input
          type="text"
          name="date"
          value={updatedLog.date}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Location:
        <input
          type="text"
          name="location"
          value={updatedLog.location}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Ship Name:
        <input
          type="text"
          name="shipName"
          value={updatedLog.shipName}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Title:
        <input
          type="text"
          name="title"
          value={updatedLog.title}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Log Content:
        <textarea
          name="logContent"
          value={updatedLog.logContent}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Mistake Today:
        <input
          type="checkbox"
          name="mistakesWereMadeToday"
          checked={updatedLog.mistakesWereMadeToday}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Photo URL:
        <input
          type="text"
          name="photoURL"
          value={updatedLog.photoURL}
          onChange={handleInputChange}
        />
      </label>

      <button type="submit">Update</button>
    </form>
  );
}

export default UpdateForm;
