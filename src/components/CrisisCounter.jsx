import React, { Component } from 'react';

class CrisisCounter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      daysSinceLastCrisis: 0,
    };
  }

  componentDidMount() {
    // Fetch the days since the last crisis from your data source (API, database, etc.)
    // You can update this value based on your actual data source.
    // For this example, we'll increment the days since the last crisis every second.
    this.interval = setInterval(() => {
      this.setState((prevState) => ({
        daysSinceLastCrisis: prevState.daysSinceLastCrisis + 1,
      }));
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { daysSinceLastCrisis } = this.state;
    return (
      <div className="crisis-counter">
        <h2>Days Since Last Crisis:</h2>
        <div className="counter">{daysSinceLastCrisis}</div>
      </div>
    );
  }
}

export default CrisisCounter;
