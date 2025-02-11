import React from 'react';

const RadioButtonsGroup = ({ options, name, selectedOption, onChange, className, labelClassName }) => {
  return (
    <div className={className}>
      {options.map((option) => (
        <label key={option.value} className="flex items-center">
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selectedOption == option.value}
            onChange={onChange}
            className="mr-2"
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default RadioButtonsGroup;