//Imports
//React hook imports
// useState and useEffect are built-in React hooks.
// - useState lets this hook hold internal data (loading, current weather, etc).
// - useEffect lets this hook run side effects (API calls) when city/units change.
import { useEffect, useState } from "react";
// geocodeCity:
// A helper function from /services that takes a city name and returns latitude and longitude using an external geocoding API.
import { geocodeCity } from "../services/geocodingClient.js";
// fetchTodayWeather:
// A helper function from /services that calls the Open-Meteo API and returns current and hourly weather data.
import { fetchTodayWeather } from "../services/openMeteoClient.js";

// initialState:
// A clean starting point for the weather data before any API calls run. This prevents undefined errors and gives the UI predictable structure
//This is defined once as a const so the overall state shape is easy to reuse and reset later. This keeps the code cleaner and prevents
// accidental changes to the initial structure.
const initialState = {
  loading: false,
  error: null,
  location: null,
  current: null,
  hourly: []
};

/**
 * useWeather hook encapsulates the logic for:
 *  - geocoding a city name to coordinates
 *  - fetching current + hourly weather
 *  - managing loading & error states
 * Instead of placing API calls inside a component, we keep this logic here for cleaner, reusable code.
 *
//  * @param {string} city - City name to search.
//  * @param {"metric" | "imperial"} units - Measurement units.
//  */

// state:
  // Holds everything needed by the UI: loading, error, location, current, hourly. Components using this hook will re-render when state changes.
function useWeather(city, units) {
  const [state, setState] = useState(initialState);

// useEffect:
  // Runs whenever city or units change.
  // Handles:
  //   - Validating the city
  //   - Running the API calls
  //   - Updating state
  // If no city exists, nothing runs.
  useEffect(() => {
    if (!city) return; // ! checks to see if city variable is empty. if it is, it does nothing. 

    // cancelled flag
    let cancelled = false; // Prevents state updates if the component unmounts before the API finishes.

    async function loadWeather() {
      setState((prev) => ({ ...prev, loading: true, error: null })); // Indicates loading and clears any previous errors.

      try {
        const location = await geocodeCity(city);  // Step 1: Look up the coordinates for the city.

        if (!location) {  // If the geocoding API could not find a matching location, and the component is still in use and not cancelled,
          if (!cancelled) {  // update the state with an error and clear out any old weather data.
            setState({
              loading: false,
              error: "Location not found.",
              location: null,
              current: null,
              hourly: []
            });
          }
          return;
        }
         // Step 2: Fetches weather using coordinates.
        const raw = await fetchTodayWeather(location.latitude, location.longitude, units);
        // Extracts the pieces we need from the Api
        const current = raw.current_weather || null;
        const hourly = raw.hourly || {};
        // Step 3: Update the state only if the component is still in use.
        if (!cancelled) { // If component is still in use, then its safe to update the state as listed below.
          setState({
            loading: false,
            error: null,
            location,
            current,
            hourly
          });
        }

      } catch {
        // this runs if the API call fails
        if (!cancelled) {
          setState({
            loading: false,
            error: "Could not load weather data. Please try again.",
            location: null,
            current: null,
            hourly: []
          });
        }
      }
    }

    loadWeather();  // Starts the weather loading async function.

    // Cleanup function: React runs this when the component using this hook is no longer in use.
    return () => {
      cancelled = true; // marks the effect as canceled so any requests will not update the state.
    };
  }, [city, units]); // re-runs this effect whenever the city or units change.

  return state;
}

export { useWeather };
