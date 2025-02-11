import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import SearchWhite from '../../iconos/search_white';
import Search from '../../iconos/search';
import './InputSearch.css';

const InputSearch = ({
  placeholder = '',
  name,
  value,
  onChange,
  type = 'text',
  className = '',
  iconType = 'search',
  placeholderColor = 'placeholder-gris-azulado-profundo',
  iconPosition = 'right',
  results = [],
  onResultClick
}) => {
  const inputRef = useRef(null);

  return (
    <div className="relative w-full">
      {iconPosition === 'left' && (
        iconType === 'search' ? (
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer" />
        ) : (
          <SearchWhite className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer" />
        )
      )}
      <input
        ref={inputRef}
        className={`w-full h-10 py-0 px-3 rounded-full text-sm font-sans font-medium leading-5 text-left bg-transparent shadow ${placeholderColor} ${className} outline-none focus:ring-0 ${iconPosition === 'left' ? 'pl-10' : 'pr-10'}`}
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {iconPosition === 'right' && (
        iconType === 'search' ? (
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" />
        ) : (
          <SearchWhite className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" />
        )
      )}
      {results.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white dark:bg-gris-azulado-profundo shadow-md border-t border-gray-200 dark:border-t-gris-carbón z-50">
          <ul className="max-h-[300px] overflow-auto">
            
            
            {results.map((result, index) => (
              <li
                key={index}
                className="p-2 border-b border-gray-100 cursor-pointer hover:bg-gray-100 dark:hover:bg-gris-carbón dark:border-gris-carbón text-small dark:text-color-dark-texto"
                onClick={() => onResultClick(result.program_id, result.course_id)}
              >
                {result.name}
              </li>
            ))}

          </ul>
        </div>
      )}
    </div>
  );
};

InputSearch.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
  iconType: PropTypes.oneOf(['search', 'search_white']),
  iconPosition: PropTypes.oneOf(['left', 'right']),
  results: PropTypes.array.isRequired,
  onResultClick: PropTypes.func.isRequired,
};

export default InputSearch;
