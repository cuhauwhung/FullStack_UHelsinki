
import React from "react";


const Person = ({ person }) => {
    return (
        <li>{`${person.name} : ${person.number}`} </li>
    )
}

const Persons = ({ persons }) => {

    const listPersons = persons.map((person, i) => <Person key={i} person={person} />)
    return (
        <div>
            {listPersons}
        </div>  
    )
  };
  
export default Persons;
