//  * UnitsToggle switches between metric and imperial units.
// * WHAT THIS DOES:
//  * - Allows the user to switch between metric and imperial units.
//  * - Renders a <select> dropdown with two options.
//  * - When the user changes the selection, it tells the parent component.
//  *
//  * @param {object} props - Component props.
//  * @param {"metric" | "imperial"} props.units - Current units.
//  * @param {(units: "metric" | "imperial") => void} props.onChange - Callback when units change.
//  */
// PROPS:
// - units: the currently selected unit system ("metric" or "imperial").
//  *   This keeps the dropdown in sync with the parent’s state.
// - onChange(newUnits):
//  *     A callback function provided by the parent.
//  *     This is triggered whenever the user selects a different unit system.

//Bootstrap react imports
import Form from 'react-bootstrap/Form';

const UnitsToggle = ({ units, onChange }) => {
    //  handleChange
//  WHAT THIS DOES:
//   - Reads the value the user chose from the <select>.
//   - Normalizes it to either "metric" or "imperial".
//   - Calls the parent’s onChange() function with that value.
// WHY WE NEED THIS:
//    * The dropdown itself does not hold any state. It simply notifies the parent component, which stores the real state.
  const handleChange = (event) => {  // event.target.value will be either "metric" or "imperial"

    const value = event.target.value === "metric" ? "metric" : "imperial";
    onChange(value);  // Notifies the parent component of the change
  };

  return (
    <div className="units-toggle">
      <Form.Select
        id="units-select"
        title="Units"
        value={units}
        onChange={handleChange}
      >
        <option value="metric">Metric (°C, km/h)</option>
        <option value="imperial">Imperial (°F, mph)</option>
      </Form.Select>
    </div>
  );
};
// CONTROLLED SELECT:
//  * - Just like controlled inputs, the <select> value is controlled by React.
//  * - The parent owns the actual unit state.
//  * - UnitsToggle simply *displays* and *updates* it.

export default UnitsToggle;
