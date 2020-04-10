import React, { useState, useEffect } from "react";

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from "./components/Filter";
import NoteService from "./services/noteService"
import noteService from "./services/noteService";


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
    NoteService.getAll().then(initialPeople => {
      setPersons(initialPeople)
    })
  }, [])


  const addPerson = (event) => {

    event.preventDefault();
    const idx = persons.map(p => p.name).indexOf(newName);

    if (idx === -1) {

      const newId = Math.max(persons.map(p => p.id)) + 1 
      const personObj = {
        name: newName,
        number: newNum,
        id: newId
      }

      noteService.create(personObj).then(response => {
        setPersons(persons.concat(personObj))
        setNewName('')
        setNewNum('')
      })

    } else {

      var confirm = window.confirm(`${newName} is already added to phonebook, want to replace the old number with a new one`)
      const new_idx = idx + 1 
      
      const personObj = {
        name: newName,
        number: newNum, 
        id: new_idx 
      }

      if (confirm) {
         
        noteService.update(new_idx, personObj).then(response => {
          setNewName('')
          setNewNum('')
        })

        NoteService.getAll().then(refreshPeople => {
          setPersons(refreshPeople)})
        
        console.log(persons)

      }
    }
  }

  return (
    <div>
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

