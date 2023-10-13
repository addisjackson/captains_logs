import React from 'react';

function RadioButton({ value, selectedValue, handleSelect }) {
  return (
    <label>
      <input
        type="radio"
        value={value}
        checked={value === selectedValue}
        onChange={() => handleSelect(value)}
      />
      {value}
    </label>
  );
}

export default RadioButton;
