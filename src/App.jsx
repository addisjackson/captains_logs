import { useState, useEffect } from "react";
import { initLogs, removeLog, getLogs, updateLog } from "./model/logStorage";
import NavBar from "./components/NavBar";
import { Router, Routes, Route } from "react-router-dom";
import LogList from "./components/LogList";
import EditLogModal from "./components/EditLogModal";
import LogDetailWrapper from "./components/LogDetailWrapper";


function App() {
  initLogs();
  const [filters, setFilters] = useState({
    searchQuery: "",
    captain: "all",
  });

  const [logs, setLogs] = useState([]);
  const 
  
[editingLog, setEditingLog] = useState(null);

  // Load logs
  useEffect(() => {
    setLogs(getLogs());
  }, []);

  // Refresh logs from localStorage
  const refreshLogs = () => {
    setLogs(getLogs());
  };

  // Edit log
  const handleEditLog = (captainEntry, log) => {
    setEditingLog(log);
  };

  // Close modal
  const handleCloseModal = () => {
    setEditingLog(null);
    refreshLogs();
  };

  // **New: handle filter changes**
  const handleFilterChange = (updated) => {
    setFilters((prev) => ({ ...prev, ...updated }));
  };

  return (
    <>
      <NavBar filters={filters} setFilters={setFilters} />
      <div className="container mx-auto px-4 py-6">
        <Routes>
          <Route
            path="/"
            element={
              <LogList
                filters={filters}
                onFilterChange={handleFilterChange} // ✅ pass handler
                onEditLog={handleEditLog}
              />
            }
          />
          <Route path="/logs/:id" element={<LogDetailWrapper />} />
        </Routes>
      </div>

      {editingLog && (
        <EditLogModal
          logData={editingLog} // pass log data
          onClose={handleCloseModal}
          onSave={(updatedLog) => {
            // save edits to storage
            updateLog(updatedLog);
            handleCloseModal();
          }}
        />
      )}
    </>
  );
}

export default App;