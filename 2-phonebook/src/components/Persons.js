const Person = ({ id, name, number, deletePerson }) => {
  const promptDelete = () => {
    if(window.confirm(`Delete ${name} ?`)) {
      deletePerson()
    }
  }

  return <li>
    {name} {number}
    <button onClick={promptDelete}>delete</button>
  </li>
}

const Persons = ({ persons, search, deletePerson }) =>
  <ul>
  {persons
    .filter(person =>
      person.name.toLocaleLowerCase().includes(search.toLowerCase())
    )
    .map(({ name, number, id }) =>
      <Person key={name} name={name} number={number} deletePerson={() => deletePerson(id)} />
    )}
</ul>

export default Persons