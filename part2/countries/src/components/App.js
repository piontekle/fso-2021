import React, { useState, useEffect } from 'react';
import axios from 'axios';

import SearchBox from './SearchBox';
import CountryList from './CountryList';
import Country from './Country';

const App = () => {
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(res => {
        setCountries(res.data);
      }, [])
  });

  const onChangeSearch = (event) => {
    const newSearch = event.target.value;
    setSearch(newSearch);

    const filter = countries.filter(country =>
      country.name.toLowerCase().includes(newSearch.toLowerCase())
    );
    console.log(filter)
    setResults(filter);
  }

  return (
    <div>
      <SearchBox
        label="find countries"
        onChange={onChangeSearch}
        value={search}
      />
      {
        !results.length
          ? "No results"
          : results.length > 10
            ? "Too many matches, specify another filter"
            : results.length > 1
              ? <CountryList countries={results} />
              : <Country country={results[0]} />

      }
    </div>
  )
}

export default App;
