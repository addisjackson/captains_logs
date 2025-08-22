
import React from 'react';

function DateComponent({ date, handleDateChange }) {
  // The parent should update the date state, so just call the prop
  return (
    <div>
      <input
        type="date"
        value={date}
        onChange={(e) => handleDateChange(e.target.value)}
      />
    </div>
  );
}

export default DateComponent;

