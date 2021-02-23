import { useState } from 'react'
import axios from 'axios'

const Country = ({ country, requestWeather }) => {
  const { name, capital, population, languages, flag } = country
  const weather_key = process.env.REACT_APP_API_KEY
  const [weather, setWeather] = useState()

  // there's huge problems with this, it spams the API on top of weatherstack giving out HTTPS errors intermittently on the HTTP url.
  axios
    .get(`http://api.weatherstack.com/current?access_key=${weather_key}&query=${capital}`)
    .then(response => {
      console.log(response.data)
      setWeather(response.data)
    })

  return <div>
    <h2>{name}</h2>
    <p>capital {capital}</p>
    <p>population {population}</p>

    <h3>languages</h3>
    <ul>
      {languages.map(({ name }) =>
        <li key={name}>{name}</li>
      )}
    </ul>

    <img src={flag} alt={`${name} flag`} width="200" />

    if(!weather) {
      <p>retrieved</p>
    }
  </div>
}

const Countries = ({ countries, setFocus, requestWeather }) => {
  // Guards for times we don't list the countries
  if(countries.length > 10) { // Too many matches
    return <div>Too many matches, specify another filter</div>
  } else if (countries.length === 0) { // No matches
    return <div>No matches, specify another filter</div>
  } else if (countries.length === 1) { // A single matching country
    return <Country country={countries[0]} requestWeather={requestWeather} />
  }

  // List the matching countries
  return <ul>
    {countries.map(country =>
      <li key={country.name}>
        {country.name}
        <button onClick={() => setFocus([country])}>show</button>
      </li>
    )}
  </ul>
}

export default Countries