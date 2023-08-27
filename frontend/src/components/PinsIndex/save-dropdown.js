import React from "react";
const CustomDropdown = ({ options, value, onChange }) => {
    return (
      <div className="custom-dropdown">
        <select value={value} onChange={onChange} className="select-board">
          {Object.values(options).map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  };
  
  export default CustomDropdown;