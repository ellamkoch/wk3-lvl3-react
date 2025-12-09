// Import React's useState hook so this page can hold simple state.
import { useState } from "react";
//imports hook for loading weather data
import { useWeather } from "../hooks/useWeather.js";


// import weather components so they can be used in the page
import CurrentWeatherCard from "../components/weather/CurrentWeatherCard";
import SearchBar from "../components/weather/SearchBar";
import UnitsToggle from "../components/weather/UnitsToggle";

// Bootstrap react imports
import Spinner from 'react-bootstrap/Spinner';

/**  Today page.
// This page is responsible for:
// - holding the city and units state
// - calling the custom useWeather hook to load weather data
// - rendering the search controls (SearchBar, UnitsToggle)
// - conditionally showing a loading spinner, an error, or the CurrentWeatherCard

  The actual data-fetching logic lives inside the useWeather hook.
  TodayPage just passes city and units into the hook and displays the result.
 */
function TodayPage() {
  // State for the selected city (controlled by SearchBar)
  const [city, setCity] = useState("London"); // Default is "London" so the page has an initial city to show.

  // State for the selected units (controlled by UnitsToggle) "metric" → °C, km/h; "imperial" → °F, mph.
  const [units, setUnits] = useState("metric");

  // Call the hook similar to how we call the react hooks
  const weatherState = useWeather(city, units);
  // We pass in city and units, and the hook returns a state object with { loading, error, location, current, hourly }.

 // SearchBar will call this function when the user submits a new city.
  const handleSearch = (newCity) => { // using arrow functions as they're a shorter way to write functions
    //arrow functions are also a common way to write event handlers in react.
    //Child component(SearchBar) can call this because we pass it down as the onSearch prop.
    // () above holds the function parameters
    setCity(newCity);
    // setCity is the function that updates the city value to newCity, which is pulled from the SearchBar function
    //Because city is a dependency of useWeather, changing it will cause the hook to re-run and fetch new data.

  };

   // Handler for unit changes.
   const handleUnitsChange = (newUnits) => {  // UnitsToggle will call this function when the user switches between metric and imperial.
    setUnits(newUnits); //newUnits will be metric or imperial, depending upon toggle selected
    // Because units is also a dependency of useWeather, changing it will cause the hook to re-run and fetch data with the new units.

  };

  //returns info for page
   return ( //SearchBar receives the handleSearch function as a prop. When the user submits a city, it calls onSearch(newCity).
    // UnitsToggle receives the current units and a callback to update them.
    //showing weather shows us what city and units are selected. values update when user makes changes thanks to react state
    //error line returns an error message and displays it
    //loading - conditional rendering for loading vs. weather display. if state loading is true - shows spinner. otherwise, CurrentWeatherCard is loaded.
    <section>
      <div className="card" style={{ marginBottom: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
          <SearchBar onSearch={handleSearch} />
          <UnitsToggle units={units} onChange={handleUnitsChange} />
        </div>

        <p style={{ marginTop: "0.75rem", fontSize: "0.9rem" }}>
          Showing weather for <strong>{city}</strong> ({units} units).
        </p>

        {weatherState.error && <p style={{ color: "#f97373" }}>{weatherState.error}</p>}
      </div>


      {weatherState.loading ? (
        <Spinner animation="border" />
      ) : (
        <CurrentWeatherCard
          current={weatherState.current}
          location={weatherState.location}
          units={units}
        />
      )}
    </section>
  );
}
// values in {} in the JSX are coming from state/variables so it's easier to replace them with real API data later.

export default TodayPage;
