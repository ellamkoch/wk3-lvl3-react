// This file contains a helper function that talks to the Open-Meteo Forecast API.
// It fetches both current weather and hourly weather for a given latitude/longitude pair.
//
// Keeping API calls in a separate "services" folder helps organize the code.
// Components and hooks do not need to know how URLs or params work; they simply call fetchTodayWeather(...) and receive clean data back.

// This function does not transform or clean the data. The hook (useWeather) handles that. This function is only concerned with calling the API.

//Axios Import
import axios from "axios";

/**
 * Fetches current and hourly weather data for a given coordinate using Open-Meteo.
 *
 * @param {number} latitude
 * @param {number} longitude
 * @param {"metric" | "imperial"} units
 * @returns {Promise<object>} Raw API data.
 */
export async function fetchTodayWeather(latitude, longitude, units) {
  // Maps our units toggle to Open-Meteo units to the specific unit strings the API expects in its query params
  const isMetric = units === "metric";

  // Query parameters sent to the Open-Meteo forecast endpoint.
  // These control lat, long, hourly fields, current weather, units for temp and wind, and timezones
  const params = {
    latitude,
    longitude,
    hourly: ["temperature_2m", "relativehumidity_2m", "apparent_temperature", "windspeed_10m"],
    current_weather: true,
    timezone: "auto", // timezone chosen based on location
    temperature_unit: isMetric ? "celsius" : "fahrenheit",
    windspeed_unit: isMetric ? "kmh" : "mph"
  };
  // baseurl
  const url = "https://api.open-meteo.com/v1/forecast";

  //using axios to send a get request. axios builds query string automatically and parses json response.
  const response = await axios.get(url, { params });
  return response.data; // returns only parsed data.
  // useWeather hook decides how to interpret and structures data for the UI.
}
