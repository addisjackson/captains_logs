import React from 'react';
import DateComponent from './DateComponent';
import RadioButton from './RadioButton';

function Navbar({
  selectedDate,
  handleDateChange,
  selectedOrder,
  handleOrderChange,
  selectedMistakes,
  handleMistakesChange,
  selectedCrisis,
  handleCrisisChange,
}) {
  return (
    <div className="navbar">
      <h1>Captain's Log</h1>
      <div className="search-bar">
        <DateComponent date={selectedDate} handleDateChange={handleDateChange} />
        <RadioButton
          value="asc"
          selectedValue={selectedOrder}
          handleSelect={handleOrderChange}
        />
        <RadioButton
          value="desc"
          selectedValue={selectedOrder}
          handleSelect={handleOrderChange}
        />
        <RadioButton
          value="true"
          selectedValue={selectedMistakes}
          handleSelect={handleMistakesChange}
        />
        <RadioButton
          value="false"
          selectedValue={selectedMistakes}
          handleSelect={handleMistakesChange}
        />
        <RadioButton
          value="gt10"
          selectedValue={selectedCrisis}
          handleSelect={handleCrisisChange}
        />
        <RadioButton
          value="gte20"
          selectedValue={selectedCrisis}
          handleSelect={handleCrisisChange}
        />
        <RadioButton
          value="lte5"
          selectedValue={selectedCrisis}
          handleSelect={handleCrisisChange}
        />
      </div>
    </div>
  );
}

export default Navbar;
