// This component only DISPLAYS the weather values that are passed in as props. It does not hold state.
// Props used:
// - city (string)
// - temperature (string or number)
// - description (string)

// props are destructured so its cleaner when the info is pulled from the Api
function CurrentWeatherCard({ city, temperature, description}) {
  return (
    <section className="card">
      <h2>Current Weather Information for {city} </h2>
      <h3>{temperature} </h3>
      <p>{description} </p>
     </section>
  );

}

export default CurrentWeatherCard;
