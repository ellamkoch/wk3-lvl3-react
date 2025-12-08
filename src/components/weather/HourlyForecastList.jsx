// This file creates the component for the hourly forecast list
// for the date selected from the daily forecast list.
//bootstrap imports for styles
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function HourlyForecastList ({ hourly, units, selectedDate }) {
    if (!hourly || !hourly.time || hourly.time.length === 0 || !selectedDate) {
        return (     //if there is no horuly data, or a date entered, it returns the msg below in a card
            <div className="card">
                <p>No hourly data yet</p>
            </div>
        );
    }

    //variable options for units tih an if/else with ternary operators
    const temperatureUnit = units === "metric" ? "°C" : "°F";

    // Problem: Need to get time separated from the date in the api info
    // Built an array to store the time and return time and temp info by the hour
    const allHours = hourly.time.map((hourString, index) => {
        const [datePart, timePart] = hourString.split("T"); //splitting out the date/time from the newarray
        return {
            date: datePart,
            time: timePart,
            temperature: hourly.temperature_2m?.[index],
        };// ? makes it so it doesn't break if there's no data there for the temp.
    });
        // Now have to filter to only get hours for the selected date
        const hoursForDay = allHours.filter(
            (hourObj) => hourObj.date === selectedDate
        );

        if (hoursForDay.length === 0) { //returns msg below if no hourly data is found
            return (
            <div className="card" style ={{ marginTop: "1rem"}}>
                <p>No hourly data found</p>
            </div>
            );
        }
// Render the info on the page
const hourlyRender = hoursForDay.map((hourObj) => (
    <Container>
    <Row key={hourObj.time} className="hour-row">
        <Col className="hour-row__time">{hourObj.time}</Col>

        <Col className="hour-row__temp">{Math.round(hourObj.temperature)}{temperatureUnit}</Col>
    </Row>
    </Container>
));

    return ( //wraps it in a div to display it.
        <div className="card" style={{ marginBottom: "1rem" }}>
            <h3>Hourly Forecast</h3>

            <div className="hourly-grid">
                {hourlyRender}
            </div>
        </div>
    );
}
