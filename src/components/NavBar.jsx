// src/components/NavBar.jsx
import React from "react";

const NavBar = ({ filters, onFilterChange }) => {
  return (
    <nav className="bg-blue-600 p-4 text-white flex flex-wrap items-center gap-4">
      <h1 className="text-xl font-bold">Captain’s Logs</h1>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search logs..."
        value={filters.searchQuery}
        onChange={(e) =>
          onFilterChange && onFilterChange({ searchQuery: e.target.value })
        }
        className="p-2 rounded text-black"
      />

      {/* Captain filter */}
      <select
        value={filters.captain}
        onChange={(e) =>
          onFilterChange && onFilterChange({ captain: e.target.value })
        }
        className="p-2 rounded text-black"
      >
        <option value="all">All Captains</option>
        {filters.captainOptions?.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </nav>
  );
};

export default NavBar;
