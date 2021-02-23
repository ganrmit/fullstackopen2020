import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Countries from './components/Countries'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const App = () => {
  const [ search, setSearch ] = useState('')
  const [ allCountries, setAllCountries ] = useState([])
  const [ focus, setFocus ] = useState(null)

  const matchingCountries = focus ?
    focus
    : allCountries.filter(({ name }) =>
        name.toLowerCase().includes(search.toLowerCase())
      )

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setAllCountries(response.data))
  }, [])

  const handleSearchChange = event => {
    setSearch(event.target.value)
    setFocus(null)
  }

  // This is not properly implemented, I keep getting a HTTPS error from weatherstack even though I'm using HTTP. Moving on.
  const requestWeather = country => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
      .then(response => {
        const newCountry = {...country, weather: response.data}
        // ... not implemented
      })
  }

  return (
    <div>
      <Filter search={search} handleSearchChange={handleSearchChange} />
      <Countries countries={matchingCountries} setFocus={setFocus} requestWeather={requestWeather} />
    </div>
  )
}

export default App;
