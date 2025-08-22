// src/components/LogList.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getLogs, removeLog } from "../model/logStorage";
import { captainImages, shipImages } from "../assets/index.js";

const LogList = ({ filters = {}, onFilterChange = () => {}, onEditLog = () => {} }) => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const storedLogs = getLogs() || [];
    setLogs(storedLogs);
  }, []);

  // Apply filters
  const filteredLogs = logs.filter((entry) => {
    if (!entry) return false;

    // Captain filter
    if (filters.captain && filters.captain !== "all") {
      if (entry.captainName !== filters.captain) return false;
    }

    // Search filter
    const search = (filters.searchQuery || "").toLowerCase();
    if (!search) return true;

    const captainMatch = entry.captainName?.toLowerCase().includes(search);
    const logMatch = entry.logs?.some(
      (l) =>
        l?.logTitle?.toLowerCase().includes(search) ||
        l?.logContent?.toLowerCase().includes(search)
    );

    return captainMatch || logMatch;
  });

  // Handle delete
  const handleDelete = (captainName, logId) => {
    removeLog(captainName, logId);
    setLogs(getLogs() || []);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Captain’s Logs</h2>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search logs..."
          value={filters.searchQuery || ""}
          onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
          className="border p-2 rounded"
        />

        <select
          value={filters.captain || "all"}
          onChange={(e) => onFilterChange({ captain: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="all">All Captains</option>
          {logs
            .filter((entry) => entry?.captainName)
            .map((entry) => (
              <option key={entry.captainName} value={entry.captainName}>
                {entry.captainName}
              </option>
            ))}
        </select>
      </div>

      {/* Logs List */}
      {filteredLogs.length > 0 ? (
        filteredLogs.map((entry) => (
          <div
            key={entry?.captainName || Math.random()}
            className="border rounded-lg p-4 mb-6 shadow-md bg-white"
          >
            {/* Captain & Ship Header */}
            <div className="flex items-center gap-6 mb-4">
              {entry?.captainName && (
                <img
                  src={captainImages[entry.captainName]} // ✅ use entry.captainName
                  alt={entry?.captainName || "Unknown Captain"}
                  className="w-20 h-20 rounded-full object-cover"
                />
              )}
              <div>
                <h3 className="text-xl font-semibold">{entry?.captainName || "Unknown Captain"}</h3>
                <p className="text-gray-600">{entry?.shipName || "Unknown Ship"}</p>
                <p className="text-sm text-gray-500">
                  Last Crisis: {entry?.lastCrisisDate || "N/A"}
                </p>
              </div>
              {entry?.shipName && (
                <img
                  src={shipImages[entry.shipName]} // ✅ use entry.shipName
                  alt={entry?.shipName || "Unknown Ship"}
                  className="w-40 object-contain ml-auto"
                />
              )}
            </div>

            {/* Logs */}
            <ul className="space-y-3">
              {entry?.logs?.map((log) => (
                <li
                  key={log?.id || Math.random()}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <Link
                    to={`/logs/${log?.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {log?.logTitle || "Untitled Log"}
                  </Link>

                  <div className="flex gap-2">
                    <button
                      onClick={() => onEditLog(entry, log)} // ✅ pass both entry + log
                      className="px-2 py-1 text-sm bg-yellow-400 text-black rounded hover:bg-yellow-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(entry?.captainName, log?.id)}
                      className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No logs found.</p>
      )}
    </div>
  );
};

export default LogList;
