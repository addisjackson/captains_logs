import React, { Component } from 'react';
import './App.css';
import logs from './model/log';

class App extends Component {
  state = {
    logs: [], // Your log data array goes here
    filteredLogs: [], // For search results
    displayedLog: null, // For showing a specific log entry
    searchQuery: '', // For the search bar
  };

  // Function to handle log search
  handleSearch = (query) => {
    const filteredLogs = this.state.logs.filter((log) => {
      // Implement your search criteria here
      return (
        log.captainName.toLowerCase().includes(query.toLowerCase()) ||
        log.date.toLowerCase().includes(query.toLowerCase()) ||
        log.content.toLowerCase().includes(query.toLowerCase())
      );
    });

    this.setState({ filteredLogs, searchQuery: query });
  };

  // Function to delete a log entry
  deleteLog = (logId) => {
    const updatedLogs = this.state.logs.filter((log) => log.id !== logId);
    this.setState({ logs: updatedLogs });
  };

  // Function to update a log entry
  updateLog = (logId, updatedLog) => {
    const updatedLogs = this.state.logs.map((log) => {
      if (log.id === logId) {
        return { ...log, ...updatedLog };
      }
      return log;
    });
    this.setState({ logs: updatedLogs });
  };

  const handleUpdateLog = (updatedLog) => {
    // Send the updatedLog to your server and update the logs array
  };

  // Function to show a specific log entry
  showLog = (logId) => {
    const logToDisplay = this.state.logs.find((log) => log.id === logId);
    this.setState({ displayedLog: logToDisplay });
  };

  // Function to post a new log entry
  postLog = (newLog) => {
    // Generate a unique ID for the new log entry
    newLog.id = Date.now(); // You can use a timestamp as a unique ID
    this.setState((prevState) => ({ logs: [...prevState.logs, newLog] }));
  };

  render() {
    return (
      <div className="App">
        <header>
          <NavBar />
          <nav>
            <div>
              {/* Crisis Counter */}
              <CrisisCounter logs={this.state.logs} />
            </div>
            <div>
              <button>Order by Name</button>
              <button>Order Chronologically</button>
              <FilterOptions handleSearch={this.handleSearch} />
            </div>
          </nav>
        </header>

        <main>
          {/* Log Form */}
          <LogForm postLog={this.postLog} />

          {logs.map((log) => (
        <LogEntry key={log.id} log={log} onUpdate={handleUpdateLog} />
      ))}
          {this.state.displayedLog && <LogEntry log={this.state.displayedLog} />}

          {/* List of Logs */}
          <LogList
            logs={this.state.filteredLogs.length > 0 ? this.state.filteredLogs : this.state.logs}
            showLog={this.showLog}
            deleteLog={this.deleteLog}
            updateLog={this.updateLog}
          />
        </main>
      </div>
    );
  }
}

export default App;
