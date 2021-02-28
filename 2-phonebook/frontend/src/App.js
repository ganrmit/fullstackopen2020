import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'
import Notification from './components/Notification'
import Error from './components/Error'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')
  const [ notification, setNotification ] = useState(null)
  const [ error, setError ] = useState(null)

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const addName = event => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber
    }

    const match = persons.find(p => p.name === newName)
    // On duplicate names prompt on whether to update number
    if(match) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personsService
          .update(match.id, newPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p =>
              p.id === match.id ? returnedPerson : p
            ))
            setNewName('')
            setNewNumber('')
            setNotification(`${newName}'s number updated`)
            setTimeout(() => setNotification(null), 5000)
          })
          .catch(e => {
            setError('User nonexistant on the server.')
            setTimeout(() => setError(null), 5000)
            personsService
              .getAll()
              .then(initialPersons => setPersons(initialPersons))
          })
      }
    } else { // else create new
      personsService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotification(`Added ${newName}`)
          setTimeout(() => setNotification(null), 5000)
        })
    }
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

  const deletePerson = id => {
    personsService
      .remove(id)
      .then(result => {
        setPersons(persons.filter(p => p.id !== id))
      })
      .catch(e => {
        setError('User already removed from the server.')
        setTimeout(() => setError(null), 5000)
        personsService
          .getAll()
          .then(initialPersons => setPersons(initialPersons))
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notification} />
      <Error message={error} />

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
      <Persons persons={persons} search={search} deletePerson={deletePerson} />
    </div>
  )
}

export default App