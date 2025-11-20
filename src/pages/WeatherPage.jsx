import { useEffect, useState } from "react";
import axios from "axios";
import { CityTabs } from "../components/CityTabs";
import { ForecastHours } from "../components/ForecastHours";
import { ForecastDays } from "../components/ForecastDays";

const API_KEY = "9170e0e85794088df319259526c55afd";
export const WeatherPage = () => {
  const [city, setCity] = useState("Rio de Janeiro");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      )
      .then((res) => setWeather(res.data))
      .catch((error) => {
        console.error(error);
      });
  }, [city]);
  return (
    <div>
      <CityTabs selectedCity={city} onSelect={setCity} />
      {weather && (
        <>
          <ForecastHours data={weather} />
          <ForecastDays data={weather} />
        </>
      )}
    </div>
  );
};
