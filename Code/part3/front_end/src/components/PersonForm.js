import React from 'react'

const PersonForm = ({ addPerson, name, handleNewName, number, handleNewNum }) => {

  return (

    <form onSubmit={addPerson}>
      <div>
      
        name: <input value={name}
          onChange={handleNewName} />
          
        <br></br>
        number: <input value={number}
          onChange={handleNewNum} />
      
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>

  )
}

export default PersonForm;
