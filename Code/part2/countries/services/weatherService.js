import axios from "axios";

const apiKey = "1d354237944f2bc29fe1b9eb7d9fdc56";
const baseURL = "http://api.weatherstack.com/";

const makeCityRequestUrl = city =>
  `${baseURL}/current?access_key=${apiKey}&query=${city}`;

const getCityWeather = (city) => {

  const req = axios.get(makeCityRequestUrl(city));
  return (req.then(res => res.data.current));
};

export default { getCityWeather };