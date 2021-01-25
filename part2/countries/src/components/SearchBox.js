import React from 'react';

const SearchBox = ({ label, onChange, value }) => (
  <div>
    {label}: <input onChange={onChange} value={value} />
  </div>
)

export default SearchBox;
