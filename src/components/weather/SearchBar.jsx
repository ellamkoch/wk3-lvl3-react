// useState is the react hook that lets your components remember changing values (like the text the user types)
//cant call it unless its imported
//must import features that we plan to use
import { useState } from "react";


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
    <form onSubmit={handleSubmit} className="search-bar">

      <label htmlFor="search-input" className="sr-only">
        Search city
      </label>
      <input
        id="search-input"
        type="text"
        placeholder="Search for a city..."
        value={query}
        onChange={(event) => setQuery(event.target.value)} // updates the state
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
