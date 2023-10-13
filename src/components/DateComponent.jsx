import React from 'react';

function DateComponent({ date, handleDateChange }) {
  return (
    <input
      type="date"
      value={date}
      onChange={(e) => handleDateChange(e.target.value)}
    />
  );
}

export default DateComponent;
