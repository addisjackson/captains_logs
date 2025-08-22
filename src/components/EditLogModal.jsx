// src/components/EditLogModal.jsx
import React, { useState, useEffect } from "react";

const EditLogModal = ({ logData, onClose, onSave }) => {
  const [logTitle, setLogTitle] = useState("");
  const [logContent, setLogContent] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [mistakesWereMadeToday, setMistakesWereMadeToday] = useState(false);
  const [daysSinceLastCrisis, setDaysSinceLastCrisis] = useState(0);

  useEffect(() => {
    if (logData) {
      setLogTitle(logData.logTitle);
      setLogContent(logData.logContent);
      setLocation(logData.location);
      setDate(logData.date);
      setMistakesWereMadeToday(logData.mistakesWereMadeToday);
      setDaysSinceLastCrisis(logData.daysSinceLastCrisis);
    }
  }, [logData]);

  const handleSave = () => {
    const updatedLog = {
      ...logData,
      logTitle,
      logContent,
      location,
      date,
      mistakesWereMadeToday,
      daysSinceLastCrisis: Number(daysSinceLastCrisis),
    };

    onSave(updatedLog);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg space-y-4">
        <h2 className="text-xl font-semibold">Edit Log</h2>

        <input
          type="text"
          placeholder="Log Title"
          value={logTitle}
          onChange={(e) => setLogTitle(e.target.value)}
          className="border p-2 w-full rounded"
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 w-full rounded"
        />

        <textarea
          placeholder="Log Content"
          value={logContent}
          onChange={(e) => setLogContent(e.target.value)}
          className="border p-2 w-full rounded"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 w-full rounded"
        />

        <input
          type="number"
          placeholder="Days Since Last Crisis"
          value={daysSinceLastCrisis}
          onChange={(e) => setDaysSinceLastCrisis(e.target.value)}
          className="border p-2 w-full rounded"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={mistakesWereMadeToday}
            onChange={(e) => setMistakesWereMadeToday(e.target.checked)}
          />
          Mistakes Made Today
        </label>

        <div className="flex justify-end gap-2 mt-2">
          <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={onClose}>
            Cancel
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditLogModal;
