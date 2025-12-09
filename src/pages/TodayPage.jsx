// Import React's useState hook so this page can hold simple state.
import { useState } from "react";
/**
 * Initial Today page.
 * * Now acts as the container for:
 * - city and units state
 * - lastUpdated state
 * - SearchBar and UnitsToggle controls
 * - CurrentWeatherCard display
 *
 * This page will eventually fetch real weather data.
 * For now, it uses mock values controlled by React state.
 */
// import weather components so they can be used in the page
import CurrentWeatherCard from "../components/weather/CurrentWeatherCard";
import SearchBar from "../components/weather/SearchBar";
import UnitsToggle from "../components/weather/UnitsToggle";


function TodayPage() {
  // State for the selected city (controlled by SearchBar)
  const [city, setCity] = useState("London");

  // State for the selected units (controlled by UnitsToggle)
  // "metric" → °C, km/h; "imperial" → °F, mph.
  const [units, setUnits] = useState("metric");

  // State to track when the data was "last updated".
  // using placeholder for now for when it was last updated and weather values.
  const [lastUpdated] = useState ("Last updated: just now");


// Placeholder handler for city search.
  // For Day 2, we only update the city. Day 3 will trigger the API.
  const handleSearch = (newCity) => { // using arrow functions as they're a shorter way to write functions
    //arrow functions are also a common way to write event handlers in react.
    //Child component(SearchBar) cal call this because we pass it down as the onSearch prop.
    // () above holds the function parameters
    setCity(newCity);
    // setCity is the function that updates the city value to newCity, which is pulled from the SearchBar function
    // Day 3: trigger API request here

  };

   // Placeholder handler for unit changes.
   const handleUnitsChange = (newUnits) => {
    setUnits(newUnits); //newUnits will be metric or imperial, depending upon toggle selected
    // Day 3+: re-fetch or convert data here

  };
  //placeholder temp and desc for now for current weather card
  const currentTemperature = units === "metric" ? "18°C" : "64°F";
  const currentDescription = "Sunny with a light breeze.";

  //returns info for page
  return (
    <section className="card">
      <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
        <SearchBar onSearch={handleSearch} />
        <UnitsToggle units={units} onChange={handleUnitsChange} />
      </div>
      <div style={{ marginTop: "1rem" }}></div>
      <h2>Today&apos;s weather for <span>{city}</span></h2>
        <p>
          Units: <strong>{units === "metric" ? "Metric (°C, km/h)" : "Imperial (°F, mph)"}</strong>
        </p>
        <p>
          For now this is just mock text controlled by state. Tomorrow we will
          connect it to the Open-Meteo API.
        </p>
      <CurrentWeatherCard
        city={city}
        temperature={currentTemperature}
        description={currentDescription}
        />
      <p>{lastUpdated}</p>

    </section>
  );
// values in {} in the JSX are coming from state/variables so it's easier to replace them with real API data later.
}

export default TodayPage;
