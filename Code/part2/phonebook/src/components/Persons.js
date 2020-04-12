
import React from "react";
import PersonService from "../services/PersonService"


const Persons = ({ persons, setPersons }) => {

    const handleDeletePerson = (person) => {

        const id = person.id
        const name = person.name
        const confirm = window.confirm(`Do you want to delete ${name}`)

        if (confirm) {

            PersonService.deletePerson(id)

                .then(data =>
                    setPersons(persons.filter(person => person.id !== id))
                )

                .catch(error => {
                    alert(`Person ${name} was already deleted from the server`)

                })
        }
    }

    return (
        <div>
            {persons.map((person, i) => <li key={i}> {`${person.name} : ${person.number}`}
                <button onClick={() => {
                    handleDeletePerson(person, setPersons)
                }}>
                    Delete
        </button>
            </li>)}
        </div>
    )
}

export default Persons;