import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Country = ({ country }) => {
  const [weather, setWeather] = useState({});
  const [isUS, setIsUS] = useState(false);
  const {
    name,
    capital,
    population,
    languages,
    flag,
  } = country;

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_API_KEY}&query=${capital}`)
      .then(res => {
        setWeather(res.data);
      })

    if (name === "United States of America") setIsUS(true);
    else setIsUS(false);
  }, [capital, name])

  const windStr = weather.current && `
    ${weather.current.wind_speed} mph direction ${weather.current.wind_dir}
  `;

  return (
    <div>
      <h2>{name}</h2>
      <ul style={{listStyleType:"none"}}>
        <li><b>capital:</b> {capital}</li>
        <li><b>population:</b> {population}</li>
      </ul>
      <h3>languages</h3>
        <ul>
          {languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
        </ul>
      <img src={flag} alt="country flag"/>
      <h3>Weather in {capital}</h3>
      { weather.current && (
        <>
          <div><b>temperature:</b> {weather.current.temperature} {isUS ? "Fahrenheit" : "Celsius"} </div>
          <img alt="capital weather" src={weather.current.weather_icons?.[0]} />
          <div><b>wind:</b> {windStr}</div>
        </>
      )}
    </div>
  );
}

export default Country;
