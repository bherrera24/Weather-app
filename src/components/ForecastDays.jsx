const WEATHER_ICON_BASE_URL = "http://openweathermap.org/img/wn/";

const calculateDailyExtremes = (list) => {
  return list?.reduce((prev, current) => {
    const dateKey = current.dt_txt.split(" ")[0];
    if (!prev[dateKey]) {
      prev[dateKey] = {
        min: current.main.temp_min,
        max: current.main.temp_max,
      };
    } else {
      // prettier-ignore
      prev[dateKey].min = Math.min(prev[dateKey].min, current.main.temp_min),
      prev[dateKey].max = Math.max(prev[dateKey].max, current.main.temp_max);
    }
    return prev;
  });
};

export const ForecastDays = ({ data }) => {
  const dailyExtremes = calculateDailyExtremes(data.list);

  const days =
    data?.list?.filter((day) => {
      const date = new Date(day.dt_txt);
      return date.getHours() === 12;
    }) ?? [];

  return (
    <div
      className="forecast-days-container"
      data-tooltip="Next 5 days forecast"
    >
      <h3>Next 5 days</h3>
      {days.length > 0 ? (
        <div className="days-list">
          {days.map((day) => {
            const { dt, dt_txt, main, weather } = day;
            const date = new Date(dt_txt);
            const dateKey = dt_txt.split(" ")[0];
            const currentMax = dailyExtremes[dateKey]?.max ?? main.temp_max;
            const currentMin = dailyExtremes[dateKey]?.min ?? main.temp_min;
            const dayLabel = date.toLocaleDateString("en-US", {
              weekday: "short",
            });
            const dateLabel = date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            });

            const tempMax = Math.round(currentMax);
            const tempMin = Math.round(currentMin);
            const description = weather[0]?.description || "";
            const iconCode = weather[0]?.icon;
            const iconUrl = `${WEATHER_ICON_BASE_URL}${iconCode}.png`;
            return (
              <div key={dt} className="day-item-row">
                <div className="day-left-content">
                  <img src={iconUrl} alt={description} className="day-icon" />
                  <div className="day-text">
                    <div className="day-label-text">
                      {dayLabel}, {dateLabel}
                    </div>
                    <div className="day-description">{description}</div>
                  </div>
                </div>
                <div className="day-temps-right">
                  <span className="max-temp">{tempMax}°</span>
                  <span className="min-temp">{tempMin}°</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div> Loading...</div>
      )}
    </div>
  );
};
