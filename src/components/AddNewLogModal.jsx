// src/components/AddNewLogModal.jsx
import React, { useState } from "react";

const AddNewLogModal = ({ onClose, onSave }) => {
  const [captainName, setCaptainName] = useState("");
  const [shipName, setShipName] = useState("");
  const [logTitle, setLogTitle] = useState("");
  const [logContent, setLogContent] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [mistakesWereMadeToday, setMistakesWereMadeToday] = useState(false);
  const [daysSinceLastCrisis, setDaysSinceLastCrisis] = useState(0);

  const handleSave = () => {
    if (!captainName || !shipName || !logTitle) {
      alert("Captain, Ship, and Title are required!");
      return;
    }

    const newLog = {
      id: `${captainName.replace(/\s/g, "_")}_${Date.now()}`,
      logTitle,
      logContent,
      location,
      date,
      mistakesWereMadeToday,
      daysSinceLastCrisis: Number(daysSinceLastCrisis),
    };

    const captainData = {
      captainImage: "", // Optional: you can integrate captainImages here if needed
      shipName,
      shipImage: "", // Optional: shipImages
      lastCrisisDate: date, // set initial last crisis
    };

    onSave(captainName, newLog, captainData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg space-y-4">
        <h2 className="text-xl font-semibold">Add New Log</h2>

        <input
          type="text"
          placeholder="Captain Name"
          value={captainName}
          onChange={(e) => setCaptainName(e.target.value)}
          className="border p-2 w-full rounded"
        />

        <input
          type="text"
          placeholder="Ship Name"
          value={shipName}
          onChange={(e) => setShipName(e.target.value)}
          className="border p-2 w-full rounded"
        />

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
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewLogModal;
