import React from 'react';

import Button from './Button';

const CountryList = ({ countries, onClickShow }) => (
  <ul style={{listStyleType:"none"}}>
    {
      countries.map(country => {
        return (
          <li key={country.name}>
            {`${country.name}  `}
            <Button label="show" onClick={() => onClickShow(country)} />
          </li>
        )
      })
    }
  </ul>
);

export default CountryList;
