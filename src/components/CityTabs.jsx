const cities = ["Rio de Janeiro", "Beijing", "Los Angeles"];
export const CityTabs = ({ selectedCity, onSelect }) => {
  return (
    <div className="city-tabs-container">
      {cities.map((city) => (
        <button
          key={city}
          onClick={() => onSelect(city)}
          className={`city-tab-item ${city === selectedCity ? "active" : ""}`}
        >
          {city}
        </button>
      ))}
    </div>
  );
};
