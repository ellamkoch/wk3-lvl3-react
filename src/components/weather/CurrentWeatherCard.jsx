// This component only DISPLAYS the weather values that are passed in as props.
// @param {object} props
//  * @param {{ temperature: number, windspeed: number, weathercode?: number } | null} props.current
//  * @param {{ name: string, country: string } | null} props.location
//  * @param {"metric" | "imperial"} props.units
//  */

// props are destructured so its cleaner when the info is pulled from the Api
function CurrentWeatherCard({ current, location, units }) {
  // If we do not have valid weather or location data yet.
  if (!current || !location) { //! on here means if current or (||) location is missing it'll return this error
    return (
      <div className="card" style={{ marginTop: "1rem" }}>
        <p>No weather data yet. Try searching for a city.</p>
      </div>
    );
  }
  // Determine which units to display based on the selected system
  const temperatureUnit = units === "metric" ? "°C" : "°F"; //using ternary for mini if/else here. if metric, gives us celsius or F if Imperial
  const windUnit = units === "metric" ? "km/h" : "mph"; //using ternary for mini if/else here. if metric, gives us km/h or mph if Imperial

  return (
    <div className="card" style={{ marginTop: "1rem" }}>
      <h2>
        {location.name}, {location.country}
      </h2>
      <p style={{ fontSize: "2.5rem", margin: "0.5rem 0" }}>
        {Math.round(current.temperature)} {temperatureUnit}
      </p>
      <p>Wind: {Math.round(current.windspeed)} {windUnit}</p>
      <p>Weather code: {current.weathercode}</p>
    </div>
  ); // Math.round will round to the nearest whole #

}

export default CurrentWeatherCard;
