import React, { useState, useEffect } from "react";

import Filter from './components/Filter'
import Country from './components/Country'
import countryService from './services/countryService'

const App = () => {

  const [countries, setCountries] = useState([])
  const [newFilter, setFilter] = useState('')

  useEffect(() => {
    countryService.getAllCountries().then(data => {
      setCountries(data)
    })
  }, [])

  const handleFilter = (filter) => {
    setFilter(filter.target.value)
  }

  const changeCountriesFilter = (filter) => {
    setFilter(filter)
  }

  const listCountries = newFilter
    ? countries.filter(country => country.name.search(newFilter) != -1)
    : countries;

  return (
    <div>
      <h2> Country Info Finder </h2>
      <Filter value={newFilter} handleFilter={handleFilter} />
      <Country countryList={listCountries} changeFilter={changeCountriesFilter}/>
    </div>
  )
}

export default App;

