import React from 'react';

const CountryList = ({ countries }) => (
  <ul style={{listStyleType:"none"}}>
    {
      countries.map(country => {
        return <li key={country.name}>{country.name}</li>
      })
    }
  </ul>
);

export default CountryList;
