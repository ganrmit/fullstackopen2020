import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Countries from './components/Countries'
import axios from 'axios'

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

  return (
    <div>
      <Filter search={search} handleSearchChange={handleSearchChange} />
      <Countries countries={matchingCountries} setFocus={setFocus} />
    </div>
  )
}

export default App;
