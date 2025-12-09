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
  // Map our units toggle to Open-Meteo units.
  const isMetric = units === "metric";

  const params = {
    latitude,
    longitude,

    // Request these hourly fields.
    hourly: ["temperature_2m", "relativehumidity_2m", "apparent_temperature", "windspeed_10m"],

    // Request current weather.
    current_weather: true,

    // Request timezone and units.
    timezone: "auto",

    // Request daily
    // New for Day 4: daily forecast values.
    daily: ["temperature_2m_max", "temperature_2m_min", "weathercode"],

    temperature_unit: isMetric ? "celsius" : "fahrenheit",
    windspeed_unit: isMetric ? "kmh" : "mph"
  };

  const url = "https://api.open-meteo.com/v1/forecast"; //base url

  const response = await axios.get(url, { params });
  return response.data;
}
