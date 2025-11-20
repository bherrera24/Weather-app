const cities = ["Rio de Janeiro", "Beijing", "Los Angeles"];
export const CityTabs = ({ selectedCity, onSelect }) => {
  return (
    <div>
      {cities.map((city) => (
        <button
          key={city}
          onClick={() => onSelect(city)}
          className={city === selectedCity ? "tab active" : "tab"}
        >
          {city}
        </button>
      ))}
    </div>
  );
};
