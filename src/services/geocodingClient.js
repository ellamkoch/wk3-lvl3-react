// axios import
import axios from "axios";

/**
 * Calls the Open-Meteo Geocoding API to get the first match for a city name and returns the lat, long and basic location info in the closet match
 * @param {string} cityName - City name to search.
 * @returns {Promise<{ latitude: number, longitude: number, name: string, country: string } | null>}
 */
export async function geocodeCity(cityName) {
  const url = "https://geocoding-api.open-meteo.com/v1/search";  // The base URL for the geocoding endpoint.
   // Query parameters sent to the API.
  const params = {
    name: cityName,  // - name: the city typed by the user
    count: 1, // - count: 1 ensures we only return the first match
    language: "en"  // - language: 'en' for English results
  };
 // Perform the GET request with axios. axios automatically encodes the params into the query string.
  const response = await axios.get(url, { params });
  const data = await response.data; // Axios stores the body of the response in response.data

  if (!data.results || data.results.length === 0) { // If no results array or the array is empty,
    return null; //return null so the hook knows the location wasn't found.
  }

  const first = data.results[0]; // We requested "count: 1" so the first result is the best match.

  return { // Returns location info in a clean object literal so the rest of the app does not have to read the full API structure.
    latitude: first.latitude,
    longitude: first.longitude,
    name: first.name,
    country: first.country
  };
}
