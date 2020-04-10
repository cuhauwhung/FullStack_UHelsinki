import React from "react";

import CityWeather from './CityWeather'
import weatherService from "../services/weatherService";

function addCommas(nStr) {
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

const SingleCountry = ({ country }) => {

    const name = country.name;
    const capital = country.capital;
    const population = addCommas(country.population);
    const languages = country.languages.map(c => <li key={c.name}>{c.name}</li>);
    const flag = country.flag

    console.log(languages)
    return (
        <div>
            <h1>
                {name}
            </h1>
            <p>
                capital: {capital}
                <br></br>
                population: {population}
                <br></br>
                languages: {languages}
                <br></br>
                <img src={flag} width="150px" alt="flag" />
            </p>
        </div>
    )
}

const MultCountries = ({ countryList, changeFilter }) => {

    const listItems = countryList.map((country) =>
        <li key={country.name}>
            {country.name}
            <button onClick={() => {
                changeFilter(country.name)
            }}>
                Show
            </button>
        </li>
    )

    return (
        <div>
            {listItems}
        </div>
    )
}

const Country = ({ countryList, changeFilter }) => {

    if (countryList.length === 1) {

        var country = countryList[0]
        var city = country.capital

        return (
            <div>
                <SingleCountry country={country} />
                <CityWeather city={city} />
            </div>
        )

    } else if (countryList.length > 1 && countryList.length < 10) {

        return (
            <div>
                <MultCountries countryList={countryList} changeFilter={changeFilter} />
            </div>
        )

    } else if (countryList.length > 10 && countryList.length != 250) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )

    } else {
        return null
    }
}

export default Country;