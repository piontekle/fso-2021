import React from 'react';

import TextBox from './TextBox';

const Filter = ({ onSearch, search }) => (
  <div>
    filter shown with: <TextBox onChange={onSearch} value={search} />
  </div>
)

export default Filter;
