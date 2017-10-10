import React from 'react';

const SearchCoverage = ({handleKeyUp}) => {
  return (
    <div className="control">
    <input
      type="text"
      className="input is-large"
      placeholder="Coverage"
      onKeyUp={handleKeyUp}
    />
    </div>
  );
};

export default SearchCoverage;
