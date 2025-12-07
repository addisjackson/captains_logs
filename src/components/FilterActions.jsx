import React from "react";
import logsData from "../model/logs.json"; // Assuming logsData is accessible here

const captains = logsData.map((entry) => entry.captainName);

const FilterActions = ({ onFilterChange }) => {
  const handleInputChange = (e) => {
    onFilterChange({ searchQuery: e.target.value });
  };

  const handleSelectChange = (e) => {
    onFilterChange({ captain: e.target.value });
  };

  return (
    <div className="flex items-center gap-3 bg-blue-600 px-0 py-0">
      {/* Search input */}
      <input
        type="text"
        placeholder="Search logs..."
        onChange={handleInputChange}
        className="px-2 py-1 text-black border-none outline-none bg-blue-600"
      />

      {/* Captain dropdown */}
      <select
        onChange={handleSelectChange}
        className="px-2 py-1 text-black border-none outline-none bg-blue-600"
      >
         <option value="">All Captains</option>
        {captains.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterActions;
