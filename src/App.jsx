import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AirIcon from "@mui/icons-material/Air";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import VisibilityIcon from "@mui/icons-material/Visibility";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CloudIcon from "@mui/icons-material/Cloud";
import WeatherInfoBox from "./components/WeatherInfoBox";

const API_KEY = "4fcde6391a2b58033c2b5a93e1777d13";

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherData = async (city) => {
    try {
      const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;
      const geoResponse = await fetch(geoUrl);
      const geoResult = await geoResponse.json();

      if (geoResult.length === 0) {
        alert("City not found");
        return;
      }

      const { lat, lon } = geoResult[0];

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
      const weatherResponse = await fetch(weatherUrl);
      const weatherResult = await weatherResponse.json();

      setWeatherData({
        cityName: weatherResult.name,
        date: new Date(weatherResult.dt * 1000).toDateString(),
        description: weatherResult.weather[0].main,
        temperature: weatherResult.main.temp.toFixed(1),
        windSpeed: `${weatherResult.wind.speed} m/s`,
        humidity: `${weatherResult.main.humidity}%`,
        visibility: `${(weatherResult.visibility / 1000).toFixed(1)} km`,
        icon: weatherResult.weather[0].icon,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city) {
      fetchWeatherData(city);
    }
  };

  return (
    <div className="weather-app">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          className="city-input"
          type="text"
          placeholder="Enter City Name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="search-btn" type="submit">
          <SearchIcon />
        </button>
      </form>

      {weatherData && (
        <>
          <div className="city-date-section">
            <h2 className="city">{weatherData.cityName}</h2>
            <p className="date">{weatherData.date}</p>
          </div>
          <div className="temperature-info">
            <div className="description">
              {weatherData.icon === "01d" ? <WbSunnyIcon /> : <CloudIcon />}
              <span className="description-text">{weatherData.description}</span>
            </div>
            <div className="temp">{weatherData.temperature}°C</div>
          </div>
          <div className="additional-info">
            <WeatherInfoBox
              icon={<AirIcon />}
              value={weatherData.windSpeed}
              label="Wind"
              className="wind-info"
            />
            <WeatherInfoBox
              icon={<WaterDropIcon />}
              value={weatherData.humidity}
              label="Humidity"
              className="humidity-info"
            />
            <WeatherInfoBox
              icon={<VisibilityIcon />}
              value={weatherData.visibility}
              label="Visibility"
              className="visibility-info"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default App;
