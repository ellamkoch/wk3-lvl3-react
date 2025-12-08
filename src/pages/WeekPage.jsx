// React imports
// useState lets this page store values like city, units, and which day is selected.
import { useState } from "react";

//component imports
import SearchBar from "../components/weather/SearchBar.jsx";
import UnitsToggle from "../components/weather/UnitsToggle.jsx";
import DailyForecastList from "../components/weather/DailyForecastList.jsx";
import HourlyForecastList from "../components/weather/HourlyForecastList.jsx";

//custom hook imports
import { useWeather } from "../hooks/useWeather.js";

// Bootstrap imports
import Spinner from 'react-bootstrap/Spinner';

/**
 * WeekPage:
 *   - Stores the current city and measurement units (metric/imperial)
 *   - Uses the useWeather hook to fetch the API weather data
 *   - Shows a loading spinner while data is being fetched
 *   - Displays the 7-day forecast using DailyForecastList
 *   - Tracks which day the user has selected
 */
export default function WeekPage() {
  //local state for the page
  const [city, setCity] = useState("London"); //default city searched for upon opening the pg
  const [units, setUnits] = useState("metric");
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

//calls the useWeather hook with the current city/units selected
//returns and object containing loading, error, location, current, hourly, and daily weather info
//whenever units or city changes, hook reruns and fetches fresh data automatically
  const weatherState = useWeather(city, units);

  const selectedDate = weatherState.daily?.time?.[selectedDayIndex] || null;
//event handler for new city search.
  const handleSearch = (newCity) => { //when a new city is entered in the search bar
    setCity(newCity); // the new city is updated as the city searched
    setSelectedDayIndex(0); // and resets the selected forecast day back to 0, aka the beginning of the array.
  };

  //event handler for when the units (metric vs. imperial) change
  const handleUnitsChange = (newUnits) => {
    setUnits(newUnits); //when the units are switched, units are updated
    setSelectedDayIndex(0); // and resets the selected ay to the first day
  };
//event handler for when the user selects a day
  const handleSelectDay = (index) => { //daily forecast list calls this with the index of the of the selected day
    setSelectedDayIndex(index); // so we can highlight it on the page.
  };


// page layout for the weekly forecast.
  return (
    <section>
      <div className="card" style={{ marginBottom: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
          <SearchBar onSearch={handleSearch} />
          <UnitsToggle units={units} onChange={handleUnitsChange} />
        </div>

        <p style={{ marginTop: "0.75rem", fontSize: "0.9rem" }}>
          7-day forecast for <strong>{city}</strong> ({units} units).
        </p>

        {weatherState.error && <p style={{ color: "#f97373" }}>{weatherState.error}</p>}
      </div>

      {weatherState.loading ? ( //ternary operator to show the bootstrap spinner or the daily forecast card
        <Spinner animation="border" /> //daily and hourly info are then listed below for the page
      ) : (
        <div>
        <DailyForecastList
          daily={weatherState.daily}
          units={units}
          onSelectDay={handleSelectDay}
          selectedIndex={selectedDate}
        />
        <HourlyForecastList
          hourly={weatherState.hourly}
          units={units}
          selectedDate={selectedDate}
        />
      </div>
      )}
      </section>
  );
}
