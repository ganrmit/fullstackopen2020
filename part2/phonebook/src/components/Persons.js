const Person = ({ name, number }) =>
  <li>{name} {number}</li>

const Persons = ({ persons, search }) =>
  <ul>
  {persons
    .filter(person =>
      person.name.toLocaleLowerCase().includes(search.toLowerCase())
    )
    .map(({ name, number }) =>
      <Person key={name} name={name} number={number} />
    )}
</ul>

export default Persons