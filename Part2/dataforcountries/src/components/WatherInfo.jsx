import { useState, useEffect } from "react";
import axios from "axios";

const openWeatherAPIKey = process.env.REACT_APP_SOME_KEY;

const WeatherInfo = ({ capital }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${capital[0]}&units=metric&appid=${openWeatherAPIKey}`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
  }, [capital]);

  if (!weatherData) return null;

  const weatherIcon = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

  return (
    <div>
      <h3>Weather in {weatherData.name}</h3>
      <p>Temperature: {weatherData.main.temp} Celcius</p>
      <img
        src={weatherIcon}
        alt="weather condition"
        style={{ width: "100px" }}
      />
      <p>wind {weatherData.wind.speed} m/s</p>
    </div>
  );
};

export default WeatherInfo;
