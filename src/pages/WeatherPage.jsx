import { useEffect, useState } from "react";
import axios from "axios";
import { CityTabs } from "../components/CityTabs";
import { ForecastHours } from "../components/ForecastHours";
import { ForecastDays } from "../components/ForecastDays";

const API_KEY = "9170e0e85794088df319259526c55afd";
const API_BASE_URL = "https://api.openweathermap.org/data/2.5/forecast";
const UNITS = "metric";
const INITIAL_CITY = "Rio de Janeiro";
export const WeatherPage = () => {
  const [city, setCity] = useState(INITIAL_CITY);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const URL = `${API_BASE_URL}?q=${city}&appid=${API_KEY}&units=${UNITS}`;
        const response = await axios.get(URL);
        setWeather(response.data);
      } catch (err) {
        console.error("Error fetching weather data:", err);
        setError("Forecast could not be loaded. Please, try again");
        setWeather(null);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [city]);
  return (
    <div>
      <CityTabs selectedCity={city} onSelect={setCity} />
      {loading && <div>Loading weather data</div>}
      {error && <div style={{ color: "red", padding: "10px" }}>{error}</div>}
      {weather && (
        <>
          <h2>Simple Weather</h2>
          <ForecastHours data={weather} />
          <ForecastDays data={weather} />
        </>
      )}
    </div>
  );
};
