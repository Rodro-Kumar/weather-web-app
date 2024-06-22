import { React, useState } from "react";
import Home from "./Home";

const Weather = () => {
  const [searchValue, setsearchValue] = useState("");
  const [inputValue, setinputValue] = useState("");
  const [WeatherData, setWeatherData] = useState({});
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);

  const HandleInput = (event) => {
    setinputValue(event.target.value);
  };

  const HandleSerach = (event) => {
    const API = "3b1ee10132cc44d3a5a65238241906";

    if (inputValue == "") return;
    setloading(true);
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API}&q=${inputValue}&days=10&aqi=no&alerts=yes
    
    `)
      .then((response) => response.json())
      .then((JSON) => {
        setWeatherData(JSON);
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
      });

    setsearchValue(event.target.innerText);
  };

  const handleForecastDetails = () => {
    if (!WeatherData.location) {
      seterror(true);
    }
  };

  return (
    <>
      <Home
        historyValue={searchValue}
        handleInput={HandleInput}
        inputvalue={inputValue}
        data={WeatherData}
        loading={loading}
        HandleSerach={HandleSerach}
        handleForeCast={handleForecastDetails}
        Error={error}
      />
    </>
  );
};

export default Weather;
