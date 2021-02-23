
const Country = ({ country }) => {
  const { name, capital, population, languages, flag } = country

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
  </div>
}

const Countries = ({ countries, setFocus }) => {
  // Guards for times we don't list the countries
  if(countries.length > 10) { // Too many matches
    return <div>Too many matches, specify another filter</div>
  } else if (countries.length === 0) { // No matches
    return <div>No matches, specify another filter</div>
  } else if (countries.length === 1) { // A single matching country
    return <Country country={countries[0]} />
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