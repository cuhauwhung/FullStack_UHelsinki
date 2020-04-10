import React, { useState, useEffect } from "react";
import axios from 'axios'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from "./components/Filter";

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [newFilter, setFilter] = useState('')

  const listPersons = newFilter
    ? persons.filter(person => person.name.search(newFilter) != -1)
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
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {

    event.preventDefault();
    const idx = persons.map(p => p.name).indexOf(newName);

    if (idx !== 0) {

      const personObj = {
        name: newName,
        number: newNum,
      }

      setPersons(persons.concat(personObj))
      setNewName('');
      setNewNum('');

    } else {
      window.alert(`${newName} is already added to phonebook`)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} handleFilter={handleFilter} />

      <h2> Add a New Person: </h2>
      <PersonForm addPerson={addPerson} name={newName} handleNewName={handleNewName} number={newNum} handleNewNum={handleNewNum} />

      <h2>Numbers</h2>
      <Persons persons={listPersons} />

    </div>
  )
}

export default App;

