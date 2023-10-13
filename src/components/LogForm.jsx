import React, { Component } from 'react';

class LogForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      captainName: '',
      title: '',
      post: '',
      mistakesWereMadeToday: false,
      daysSinceLastCrisis: 0,
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: name === 'mistakesWereMadeToday' ? event.target.checked : value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // Gather the log data from the state
    const newLog = {
      captainName: this.state.captainName,
      title: this.state.title,
      post: this.state.post,
      mistakesWereMadeToday: this.state.mistakesWereMadeToday,
      daysSinceLastCrisis: parseInt(this.state.daysSinceLastCrisis),
    };

    // Pass the new log data to the parent component for submission
    this.props.onSubmit(newLog);

    // Reset the form fields after submission
    this.setState({
      captainName: '',
      title: '',
      post: '',
      mistakesWereMadeToday: false,
      daysSinceLastCrisis: 0,
    });
  };

  render() {
    return (
      <div className="log-form">
        <h2>Create New Log Entry</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Captain's Name:
            <input
              type="text"
              name="captainName"
              value={this.state.captainName}
              onChange={this.handleInputChange}
              required
            />
          </label>
          <label>
            Log Title:
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleInputChange}
              required
            />
          </label>
          <label>
            Log Content:
            <textarea
              name="post"
              value={this.state.post}
              onChange={this.handleInputChange}
              required
            />
          </label>
          <label>
            Mistake Today:
            <input
              type="checkbox"
              name="mistakesWereMadeToday"
              checked={this.state.mistakesWereMadeToday}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            Days Since Last Crisis:
            <input
              type="number"
              name="daysSinceLastCrisis"
              value={this.state.daysSinceLastCrisis}
              onChange={this.handleInputChange}
            />
          </label>
          <button type="submit">Submit Log</button>
        </form>
      </div>
    );
  }
}

export default LogForm;
