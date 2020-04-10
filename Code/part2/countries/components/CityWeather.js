import React, { useState, useEffect } from "react";

import weatherService from "../services/weatherService"

const CityWeather = ({ city }) => {

    weatherService.getCityWeather(city)
    const [weatherData, setWeatherData] = useState({});
    const [hasData, setHasData] = useState(false);

    useEffect(() => {
        weatherService.getCityWeather(city).then(data => {

            setHasData(true);
            setWeatherData({
                temperature: data.temperature,
                icon: data.weather_icons[0],
                windSpeed: data.wind_speed,
                windDirection: data.wind_dir        
            })
        })
      }, [])

    return (hasData) ? (
        <div>
            Weather in {city}
            <br></br>
            temperature: {weatherData.temperature} Celcius
            <br></br>
            <img src={weatherData.icon} alt="icon" />
            <br></br>
            wind: {weatherData.windSpeed} kph direction{" "}{weatherData.windDirection}
        </div>
    ) : null;

}

export default CityWeather;