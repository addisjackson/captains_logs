import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
    };
  }

  handleInputChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  handleSearchByName = () => {
    const { searchQuery } = this.state;
    // Filter logs by captain's name and pass the filtered logs to the parent component
    const filteredLogs = this.props.logs.filter((log) =>
      log.captainName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    this.props.onSearch(filteredLogs);
  };

  handleSearchByDate = () => {
    const { searchQuery } = this.state;
    // Filter logs by date (daysSinceLastCrisis) and pass the filtered logs to the parent component
    const filteredLogs = this.props.logs.filter((log) =>
      String(log.daysSinceLastCrisis).includes(searchQuery)
    );
    this.props.onSearch(filteredLogs);
  };

  handleSearchByContent = () => {
    const { searchQuery } = this.state;
    // Filter logs by content (post) and pass the filtered logs to the parent component
    const filteredLogs = this.props.logs.filter((log) =>
      log.post.toLowerCase().includes(searchQuery.toLowerCase())
    );
    this.props.onSearch(filteredLogs);
  };

  render() {
    return (
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={this.state.searchQuery}
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleSearchByName}>Search by Captain's Name</button>
        <button onClick={this.handleSearchByDate}>Search by Date</button>
        <button onClick={this.handleSearchByContent}>Search by Content</button>
      </div>
    );
  }
}

export default SearchBar;
