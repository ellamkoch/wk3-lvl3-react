// useState is the react hook that lets your components remember changing values (like the text the user types)
//cant call it unless its imported
//must import features that we plan to use
import { useState } from "react";

//import for react bootstrap styles
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

/**
 * SearchBar is a controlled input for city search.
 *  WHAT THIS DOES:
 * - Provides a controlled input for searching cities.
 * - Stores the user's text in local state ("query").
 * - Calls the onSearch() function (from the parent) when the form is submitted.
 *
 * PROPS:
 * - onSearch(query: string) → A callback passed down from the parent component.
 *   This will be triggered when the user submits the form with a valid search term.
 *
 * CONTROLLED INPUT:
 * - The <input> value comes from React state (query).
 * - onChange updates the query state on every keystroke.
 *   This keeps React in sync with what the user types.
 */
//  *
//  * @param {object} props - Component props.
//  * @param {(query: string) => void} props.onSearch - Called when form is submitted.
//  */
const SearchBar = ({ onSearch }) => {
    // Local state to store whatever the user types into the input.
  const [query, setQuery] = useState('');

//   handleSubmit
//    * - Setup to work like an event listener
//    * - Prevents page refresh (default browser form behavior).
//    * - Removes extra whitespace from the user’s input.
//    * - If the input is empty, stop early.
//    * - Otherwise, call the parent’s onSearch() callback.
//    */
  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmed = query.trim(); //trims the query of any extra spaces that may have been put in at the end that aren't needed

    if(!trimmed) {
      return; // Won't do a  submit on an empty search
    }

    onSearch(query);
  };

// The html label below in the form is is Aria, and it is visually hidden but still available to screen readers.
  return (
    <Form onSubmit={handleSubmit} className="search-bar d-flex">
      <Form.Group className="search " >
      <Form.Label htmlFor="search-input" className="sr-only">
            Search City
          </Form.Label>
            <div>
              <Row className="g-0">
                <Col xs={11}>
                  <Form.Control
                    id="search-input"
                    type="text"
                    placeholder="Search for a city..."
                    value={query}
                    onChange={(event) => setQuery(event.target.value)} // updates the state
                  />
                </Col>
                <Col xs={1}>
                  <Button variant="primary" type="submit">Search</Button>
                </Col>
              </Row>
            </div>
      </Form.Group>
    </Form>
  );
};
//xs with col # is part of the bootstrap grid. 12 total columns in the bootstrap grid.

export default SearchBar;
