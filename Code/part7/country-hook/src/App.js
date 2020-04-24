import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'

const BASE_URL = 'https://restcountries.eu/rest/v2/name'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (!name) { return }
    axios.get(`${BASE_URL}/${name}`).then(result => {
      if (result.data.length > 0) {
        setCountry({ data: result.data[0], found: true })

      } else {
        setCountry({ found: false })
      }
    })
  }, [name])

  return country
}

const App = () => {

  const [name, setName] = useState('')
  const nameInput = useField('text')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App