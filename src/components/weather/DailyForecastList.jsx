/**
 * This file renders a list of cards to track the daily forecast with the daily forecast data from the api.
 * When the user clicks a day, the parent is notified so it can update which day is selected.
 * @param {object} props
 * @param {{
 *   time?: string[],
 *   temperature_2m_max?: number[],
 *   temperature_2m_min?: number[],
 *   weathercode?: number[]
 * }} props.daily
 * @param {"metric" | "imperial"} props.units
 * @param {(index: number) => void} props.onSelectDay - Called when a day is clicked.
 * @param {number} props.selectedIndex
 */
// bootstrap import for styling
import Button from 'react-bootstrap/Button';

export default function DailyForecastList({ daily, units, onSelectDay, selectedIndex }) {
  //This is a safety check. If there is no daily data, it returns the msg below.
    if (!daily || !daily.time || daily.time.length === 0) { // || means or and === strictly equal to 0,
    // so no data is present at the time of the pull.
    return ( //returns the msg below in a card
      <div className="card">
        <p>No weekly data yet.</p>
      </div>
    );
  }

  const temperatureUnit = units === "metric" ? "°C" : "°F"; //variable options for units tih an if/else with ternary operators

  // We can move the daily time mapping here. - this is where we're mapping the data into a card for the page
  const dailyRender = daily.time.map((dateString, index) => { //goes through the daily.time array and
  // creates a new array with map where the element is the dateString. index is the position in the array. we list this so it goes through the whole array.
    const max = daily.temperature_2m_max?.[index]; //min and max temps are pulled from the index here.
    const min = daily.temperature_2m_min?.[index]; // ? is optional chaining with a ternary operator to keep the page from crashing if there's no info.

    const isSelected = index === selectedIndex; //tells what date is selected

    return ( //returns the daily card selected.
      <Button variant="outline-light"
        key={dateString} //react uses this to track each item when lists update
        type="button"
        className={isSelected ? "daily-card daily-card--selected" : "daily-card"} //if selected is true, add the css class daily-card--selected.
        //if false, it'll just show the daily card
        onClick={() => onSelectDay(index)}
      >
        <p className="daily-card__date">{dateString}</p>
        <p className="daily-card__temps">
          {Math.round(max)}{temperatureUnit} / {Math.round(min)}{temperatureUnit}
        </p>
      </Button>
    );// rounds temps up/down to the closest whole #.
  });

  return ( // wraps the list in a card
    <div className="card" style={{ marginBottom: "1rem" }}>
      <h2>7-Day forecast</h2>

      <div className="daily-grid d-flex flex-wrap p-2 gap-3">
        {dailyRender}
      </div>
    </div>
  );
}
