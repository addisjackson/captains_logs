import React, { Component } from 'react';

class FilterOptions extends Component {
  state = {
    sortOrder: 'chronological', // Default sort order
    filterMistakes: 'all',      // Default filter for mistakes
    filterLastCrisis: 'none',   // Default filter for last crisis
  };

  handleSortOrderChange = (event) => {
    this.setState({ sortOrder: event.target.value }, () => {
      this.props.updateFilters(this.state);
    });
  };

  handleMistakesFilterChange = (event) => {
    this.setState({ filterMistakes: event.target.value }, () => {
      this.props.updateFilters(this.state);
    });
  };

  handleLastCrisisFilterChange = (event) => {
    this.setState({ filterLastCrisis: event.target.value }, () => {
      this.props.updateFilters(this.state);
    });
  };

  render() {
    return (
      <div className="filter-options">
        <div>
          <label>Sort Order:</label>
          <select
            value={this.state.sortOrder}
            onChange={this.handleSortOrderChange}
          >
            <option value="chronological">Chronological</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
        </div>
        <div>
          <label>Mistakes:</label>
          <select
            value={this.state.filterMistakes}
            onChange={this.handleMistakesFilterChange}
          >
            <option value="all">All</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div>
          <label>Last Crisis:</label>
          <select
            value={this.state.filterLastCrisis}
            onChange={this.handleLastCrisisFilterChange}
          >
            <option value="none">None</option>
            <option value="gt">Greater than</option>
            <option value="lt">Less than</option>
            <option value="eq">Equal to</option>
          </select>
        </div>
      </div>
    );
  }
}

export default FilterOptions;
