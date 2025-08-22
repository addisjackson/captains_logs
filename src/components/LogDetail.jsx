// src/components/FilterActions.jsx
import React, { useState } from "react";
import captains from './NavBar';

function FilterActions({ onFilterChange }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [captain, setCaptain] = useState("all");
  const [mistakes, setMistakes] = useState("all");
  const [sortByDate, setSortByDate] = useState(false);
  const [dateOrder, setDateOrder] = useState("asc");
  const [sortByAlpha, setSortByAlpha] = useState(false);
  const [alphaOrder, setAlphaOrder] = useState("asc");



  // Whenever filters change, notify parent
  const handleChange = () => {
    onFilterChange({
      searchQuery,
      captain,
      mistakes,
      sort: {
        date: sortByDate ? dateOrder : null,
        alpha: sortByAlpha ? alphaOrder : null,
      },
    });
  };

  // Call handler whenever any filter state updates
  React.useEffect(() => {
    handleChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, captain, mistakes, sortByDate, dateOrder, sortByAlpha, alphaOrder]);

  return (
    <div className="p-4 border-b border-gray-300 bg-gray-50 flex flex-col gap-4">
      {/* Search Bar */}
      <div className="flex flex-col">
        <label className="text-sm font-semibold">Search Logs</label>
        <input
          type="text"
          placeholder="Search by title, name, or content"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded px-2 py-1"
        />
      </div>

      {/* Captain Dropdown */}
      <div className="flex flex-col">
        <label className="text-sm font-semibold">Filter by Captain</label>
        <select
          value={captain}
          onChange={(e) => setCaptain(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="all">All Captains</option>
          {captains.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Mistakes Filter */}
      <div className="flex flex-col">
        <label className="text-sm font-semibold">Mistakes Made</label>
        <div className="flex gap-4">
          <label>
            <input
              type="radio"
              name="mistakes"
              value="all"
              checked={mistakes === "all"}
              onChange={() => setMistakes("all")}
            />{" "}
            All
          </label>
          <label>
            <input
              type="radio"
              name="mistakes"
              value="yes"
              checked={mistakes === "yes"}
              onChange={() => setMistakes("yes")}
            />{" "}
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="mistakes"
              value="no"
              checked={mistakes === "no"}
              onChange={() => setMistakes("no")}
            />{" "}
            No
          </label>
        </div>
      </div>

      {/* Sorting Options */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold">Sort Options</label>
        
        {/* Chronological */}
        <label>
          <input
            type="checkbox"
            checked={sortByDate}
            onChange={(e) => setSortByDate(e.target.checked)}
          />{" "}
          Chronological
        </label>
        {sortByDate && (
          <div className="ml-4 flex gap-4">
            <label>
              <input
                type="radio"
                name="dateOrder"
                value="asc"
                checked={dateOrder === "asc"}
                onChange={() => setDateOrder("asc")}
              />{" "}
              Asc
            </label>
            <label>
              <input
                type="radio"
                name="dateOrder"
                value="desc"
                checked={dateOrder === "desc"}
                onChange={() => setDateOrder("desc")}
              />{" "}
              Desc
            </label>
          </div>
        )}

        {/* Alphabetical */}
        <label>
          <input
            type="checkbox"
            checked={sortByAlpha}
            onChange={(e) => setSortByAlpha(e.target.checked)}
          />{" "}
          Alphabetical
        </label>
        {sortByAlpha && (
          <div className="ml-4 flex gap-4">
            <label>
              <input
                type="radio"
                name="alphaOrder"
                value="asc"
                checked={alphaOrder === "asc"}
                onChange={() => setAlphaOrder("asc")}
              />{" "}
              Asc
            </label>
            <label>
              <input
                type="radio"
                name="alphaOrder"
                value="desc"
                checked={alphaOrder === "desc"}
                onChange={() => setAlphaOrder("desc")}
              />{" "}
              Desc
            </label>
          </div>
        )}
      </div>
    </div>
  );
}

export default FilterActions;
