import React, { useState } from 'react'
import Select from 'react-select'

const BirthdayForm = ({ show, authors, editBirthday }) => {

    const [name, setName] = useState('')
    const [birthday, setBirthday] = useState('')


    const options = authors.map(author => {
        return {
            value: author.name,
            label: author.name
        }
    })

    const submit = async (event) => {
        event.preventDefault()
        editBirthday({
            variables: {
                name: name.value,
                setBornTo: birthday
            }
        })

        setName('')
        setBirthday('')
    }

    if (!show) {
        return null
    }

    return (
        <div>
            <h2> Set birthyear </h2>
            <form onSubmit={submit}>
                <Select value={name} onChange={setName} options={options} />
                <div>
                    birthday
            <input
                        value={birthday}
                        onChange={({ target }) => setBirthday(parseInt(target.value))}
                    />
                </div>
                <button type='submit'>update author</button>
            </form>
        </div>
    )
}

export default BirthdayForm