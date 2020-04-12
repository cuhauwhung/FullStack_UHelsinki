import React, { useState, useEffect } from "react";

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notification from "./components/Notification"
import Filter from "./components/Filter"
import PersonService from "./services/personService"

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [newFilter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const listPersons = newFilter
    ? persons.filter(person => person.name.search(newFilter) !== -1)
    : persons;

  // updating the state of newName, when "box" input changes
  const handleNewName = (person) => {
    setNewName(person.target.value)
  }

  const handleNewNum = (number) => {
    setNewNum(number.target.value)
  }

  const handleFilter = (filter) => {
    setFilter(filter.target.value)
  }

  useEffect(() => {
    PersonService.getAll().then(initialPeople => {
      setPersons(initialPeople)
    })
  }, [])


  const addPerson = (event) => {

    event.preventDefault();
    const idx = persons.map(p => p.name).indexOf(newName);

    if (idx === -1) {

      const personObj = {
        name: newName,
        number: newNum
      }

      PersonService.create(personObj).then(() => {

        console.log("just created")
        setPersons(persons.concat(personObj))
        setNewName('')
        setNewNum('')

      }).catch(error => {

        setErrorMessage(
          `'${JSON.stringify(error.response.data["error"])}'`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 15000)

      })

    } else {

      var confirm = window.confirm(`${newName} is already added to phonebook, want to replace the old number with a new one`)

      const personObj = {
        name: newName,
        number: newNum,
      }

      if (confirm) {

        const personToUpdate = persons.find(personInArray => personInArray.name === newName)
        PersonService.update(personToUpdate.id, personObj).then(() => {
          setNewName('')
          setNewNum('')
        })

        PersonService.getAll().then(refreshPeople => {
          setPersons(refreshPeople)
        })

      }
    }
  }

  return (
    <div>
      <Notification message={errorMessage} />

      <h2>Phonebook</h2>
      <Filter value={newFilter} handleFilter={handleFilter} />

      <h2> Add a New Person: </h2>
      <PersonForm addPerson={addPerson} name={newName} handleNewName={handleNewName} number={newNum} handleNewNum={handleNewNum} />

      <h2>Numbers</h2>
      <Persons persons={listPersons} setPersons={setPersons} />

    </div>
  )
}

export default App;

