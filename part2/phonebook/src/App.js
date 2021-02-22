import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')

  const addName = event => {
    event.preventDefault()

    // Guard to prevent duplicate entries
    if(persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return;
    }

    setPersons(persons.concat({
      name: newName,
      number: newNumber
    }))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = event => {
    setNewName(event.target.value)
  }
  const handleNumberChange = event => {
    setNewNumber(event.target.value)
  }
  const handleSearchChange = event => {
    setSearch(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter search={search} handleSearchChange={handleSearchChange} />

      <h3>Add a new</h3>

      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons persons={persons} search={search} />
    </div>
  )
}

export default App