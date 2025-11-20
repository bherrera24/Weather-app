const WEATHER_ICON_BASE_URL = "http://openweathermap.org/img/wn/";
export const ForecastHours = ({ data }) => {
  const nextHours = data?.list?.slice(0, 4) ?? [];
  if (nextHours.length === 0) {
    return <div>Loading...</div>;
  }
  return (
    <div className="forecast-hours-container">
      <h3>Next hours</h3>
      <div className="hours-list">
        {nextHours.map((hour) => {
          const { dt, dt_txt, main, weather, pop } = hour;
          const rainPercent = Math.round(pop * 100);
          const time =
            new Date(dt_txt).toLocaleTimeString("es-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            }) ?? [];
          const description = weather[0]?.description || "";
          const iconCode = weather[0]?.icon;
          const iconUrl = `${WEATHER_ICON_BASE_URL}${iconCode}.png`;
          return (
            <div className="hour-item" key={dt}>
              <div className="temp-value">{Math.round(main.temp)}°</div>
              <div className="rain-percent">{rainPercent}%</div>
              <img src={iconUrl} alt={description} className="hour-icon" />
              <div className="time-label">{time}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
