import React from 'react';

const Country = ({ country }) => {
  const {
    name,
    capital,
    population,
    languages,
    flag,
  } = country;
  return (
    <div>
      <h2>{name}</h2>
      <ul style={{listStyleType:"none"}}>
        <li><b>capital</b> {capital}</li>
        <li><b>population</b> {population}</li>
      </ul>
      <h3>languages</h3>
        <ul>
          {languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
        </ul>

      <img src={flag} alt="country flag"/>
    </div>
  );
}

export default Country;
