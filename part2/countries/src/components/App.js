import React, { useState, useEffect } from 'react';
import axios from 'axios';

import SearchBox from './SearchBox';
import CountryList from './CountryList';
import Country from './Country';

const App = () => {
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);
  const [results, setResults] = useState([]);
  const [country, setCountry] = useState({});
  const [showCountry, setShowCountry] = useState(false);

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

    if (!filter.length || filter.length > 1) {
      setResults(filter);
      setShowCountry(false);
    } else {
      setCountry(filter[0]);
      setShowCountry(true);
    }
  }

  const onClickShow = (country) => {
    setCountry(country);
    setShowCountry(true);
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
            : !showCountry
              ? <CountryList
                  countries={results}
                  onClickShow={onClickShow}
                />
              : <Country country={country} />

      }
    </div>
  )
}

export default App;
