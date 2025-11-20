import { useEffect, useState } from "react";
import axios from "axios";

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
      <h2>{city}</h2>
      <pre>{JSON.stringify(weather, null, 2)}</pre>
    </div>
  );
};
