const WEATHER_ICON_BASE_URL = "http://openweathermap.org/img/wn/";
export const ForecastHours = ({ data }) => {
  const nextHours = data?.list?.slice(0, 4) ?? [];
  if (nextHours.length === 0) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h3>Next hours</h3>
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
          <div key={dt}>
            <div>{Math.round(main.temp)}°</div>
            <img src={iconUrl} alt={description} />
            <div>{rainPercent}%</div>
            <div>{time}</div>
          </div>
        );
      })}
    </div>
  );
};
