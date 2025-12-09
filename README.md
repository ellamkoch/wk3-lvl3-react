# wk3-lvl3-react

This is the repo for the Week 3 Classwork of Level 3 with CodeX. This week we're learning about React.

## Day 1: Project Setup, Initial Pages, and Prep for Routing

Today we set up the base files for our React weather app using Vite and started organizing the components we’ll need for the rest of the week. Most of the work involved creating the file structure, installing dependencies, and preparing the layout and pages. I also spent time reviewing routing tutorials to get familiar with the concepts before wiring them up tomorrow.

### Goal for Day 1

Set up the initial React project and create the base pages/components we’ll use when routing and state are added this week.

By the end of Day 1, the app should:

* build and run successfully with Vite
* display the shared layout (Header + Footer)
* show the TodayPage content
* include stub pages for About and Not Found
* have all required folders and initial files in place
* pass the linters

### What I Did

#### 1. Created the project using Vite

* Ran `npm create vite@latest`
* Selected the React + JavaScript template
* Installed all dependencies and confirmed the dev server runs
* Opened the project in VS Code

#### 2. Set up the folder structure

Inside `src/`, I created:

* `components/layout/Header.jsx`
* `components/layout/Footer.jsx`
* `components/layout/MainLayout.jsx`
* `pages/TodayPage.jsx`
* `pages/AboutPage.jsx`
* `pages/NotFoundPage.jsx`
* `styles/main.scss`
* `styles/_variables.scss`

This gives a clean separation between layout components, page components, and styles.

#### 3. Added the main layout

I created `MainLayout` to wrap pages with shared UI elements:

* Header
* Page content
* Footer

Routing is not wired yet, but the structure is prepared.

#### 4. Created the initial pages

I added:

* **TodayPage** with placeholder content
* **AboutPage** with simple app description text
* **NotFoundPage** with placeholder 404 text

These are ready for routing on Day 2.

#### 5. Added base SCSS styles

I created global and UI-specific styles, including:

* color and font variables
* body and layout styles
* the shared `.card` pattern
* header and footer styling

#### 6. Reviewed routing tutorials

Since routing wasn’t covered in lecture today, I watched beginner-friendly tutorials to get ahead.
I watched videos by Traversy & Net Ninja first, but the one that helped the most is listed in the Resources section below.

#### 7. Ran the linters

I ran all linters (JS and SCSS). Everything passed with expected minor warnings.

##### Linter Warnings and Fixes

During the initial setup, a few expected lint warnings appeared as I created the base files. These included:

* unused imports before all components were wired together
* React "component defined but never used" warnings
* SCSS lint warnings about selector ordering and nesting
* accessibility warnings on the About and Not Found pages before labels and structure were finalized

To fix these, I asked Copilot in VS Code for the recommended adjustments (this interaction is logged in my nightly scribbles for 12/1). Copilot suggested cleaning up unused imports, correcting file exports, and adjusting some of the SCSS rules. After applying these fixes, all linters passed successfully with no remaining errors.

### How to Run the Project

In git bash, type the following commands:

npm install
npm run dev
From there, Ctrl+Click the URL shown in the terminal to see the page.

### What I Learned Today

* How to structure a new React + Vite project
* How layout components work and how they wrap children
* How to create page components in preparation for routing
* How to organize SCSS into variables and global styles
* The basics of how React Router will integrate into the application on Day 2

## Day 2 – Routing Setup, Navigation, and New Pages

Today I added the initial routing for the weather app and connected the pages created on Day 1. I also created the WeekPage component and added a small navigation bar so the user can move between views. This was the first time using React Router in the project, so most of the work focused on wiring up paths and making sure the layout wrapped everything correctly.

### What I Did

#### 1. Created AppRouter and added React Router

* Added a new `AppRouter.jsx` file
* Wrapped the app in `<BrowserRouter>`
* Added `<Routes>` and `<Route>` elements
* Connected the following URLs:

  * `/` → TodayPage
  * `/week` → WeekPage
  * `/about` → AboutPage
  * `*` → NotFoundPage (catch-all)

#### 2. Added navigation with NavLink

* Created a simple `<nav>` inside MainLayout
* Used `<NavLink>` for switching between pages without reloading
* Enabled the `"end"` attribute so the Today link only shows active on `/`

#### 3. Updated/added new pages

* Wired up the About and NotFound pages. NotFound page uses a wildcard route
* Added WeekPage, which is a new placeholder page for the 7-day forecast with a description of what'll be added later.

#### 4. Updated TodayPage with state and UI controls

* Added:
  * `city` state (updated by SearchBar)
  * `units` state (updated by UnitsToggle)
  * `lastUpdated` state (simple placeholder string for now)
  * Wired up `handleSearch` and `handleUnitsChange` so the page updates as expected.
  * Used mock values for temperature and description so the UI can update even before connecting the API.

#### 5. Added the CurrentWeatherCard (homework)

* Created a small presentational component that receives `city`, `temperature`, and `description` as props.
* Rendered the card in TodayPage, passing in mock values.
* Displayed the `lastUpdated` state underneath the card.

#### 6. Updated App.jsx

* Removed the individual page rendering
* Replaced it with `<AppRouter />`
* Moved global styles import into App so they apply across all routes

#### 7. Ran the linters

* All linters passed with no issues when ran through git bash

### What I Learned Today

* How to add routing to a React + Vite application
* How `<BrowserRouter>`, `<Routes>`, and `<Route>` work together
* How NavLink handles active styling
* How to wrap all pages inside a shared layout
* How to set up a simple two-page navigation system
* How to create event handlers using arrow functions and pass them to child components.
* How to manage multiple pieces of state inside a page-level component.
* How to pass props into a presentational component like `CurrentWeatherCard`.
* How to structure pages vs. components in a React project.

## **Day 3 – API Integration, Custom Hooks, Routing Updates, and UI Styling**

Today we connected the full weather workflow end-to-end. The project now supports:

* City geocoding (Open-Meteo Geocoding API)
* Current + hourly weather fetching
* A reusable custom hook (`useWeather`)
* Cleaner routing with Bootstrap navigation
* Controlled forms for both Search and Units toggles
* Basic UI improvements using React-Bootstrap
* Stylelint fixes to enforce modern CSS standards

### **1. Created `openMeteoClient.js`**

* Added `fetchTodayWeather()` using Axios.
* Mapped metric/imperial units into Open-Meteo’s required format.
* Returned raw data for the hook to transform.
* Added detailed comments explaining params, unit mapping, and axios usage.

### **2. Created `geocodingClient.js`**

* Added `geocodeCity()` to convert a city name into latitude/longitude.
* Returned normalized `{ latitude, longitude, name, country }`.
* Hook uses this before fetching weather.

### **3. Built the `useWeather` Custom Hook**

Encapsulates all the weather logic:

* Handles loading, errors, and cancellations
* Performs async geocoding + weather API calls
* Normalizes returned data
* Provides `{ loading, error, location, current, hourly }` directly to components

Added extensive comments explaining:

* Why we use `cancelled` flags
* Why hooks manage state rather than components
* Why API logic lives in `/services`

### **4. Updated TodayPage to use the hook**

* City search now triggers a real API request.
* Units toggle forces a re-fetch.
* Added loading spinner (React-Bootstrap).
* Error messages now appear under the search UI.

### **5. Upgraded Navigation Bar using React-Bootstrap**

* Replaced plain links with a `<Navbar>` and `<Nav>` layout.
* Added active-state underline styling using React Router’s `<NavLink>`
  * Had to switch to this from Nav.Link as React Bootstrap docs said to get styling and pages to work.
* Moved all nav styling into SCSS.

Active class is now calculated like:
className={({ isActive }) => `nav-link ${isActive ? "nav-link-active" : ""}`
}

### **6. Improved Units Toggle UI**

Replaced the original `<select>` with a cleaner Bootstrap `<Form.Select>`.

* Keeps styling consistent with the rest of the UI.
* Still uses controlled-input logic.
* Parent manages the real `units` state.

### **7. Improved Search Bar Layout**

Used Bootstrap Grid (`Row` + `Col`) to place the Search button beside the input:

* Input: `xs={11}`
* Button: `xs={1}`

This replaced the stacked layout and looks much more professional.

### **8. Stylelint Fixes**

Resolved all linting issues:

#### **Fixed class naming**

Changed: .nav-link--active to: .nav-link-active
Because Stylelint requires strict kebab-case without double hyphens.

#### **Converted RGB format**

Changed: rgb(65, 0, 109) to modern notation:rgb(65 0 109)

#### **General cleanup**

* Removed unused styles.
* Ensured spacing, ordering, and selectors meet Stylelint rules.

All linters now pass cleanly.

## Day 4 – 7-Day Forecast, Hourly Forecast, Updated API Calls, and UI Enhancements

In class today, we pulled in the daily forecast from the API and expanded the useWeather hook.
For homework, we were to add in the hourly forecast (based on whichever day is selected), updated the API client, and beautify the UI.

### 1. Updated the API client to include daily forecast values

`fetchTodayWeather()` now requests Open-Meteo daily fields:

* `temperature_2m_max`
* `temperature_2m_min`
* `weathercode`

Also added the full `daily:` parameter array to match Day 4 requirements.

### 2. Expanded `useWeather` to return daily forecast data

Inside the hook:

* Extracted `raw.daily`
* Added it to state
* Hook now returns `{ loading, error, location, current, hourly, daily }`

This allowed the WeekPage to receive real daily API values.

### 3. Built `DailyForecastList`

This component:

* Maps over the 7-day array
* Displays each day’s date + min/max temps
* Uses a Bootstrap `<Button>` with a custom class
* Highlights the selected day using a `daily-card--selected` modifier
* Applies a hover color using SCSS
* Uses `d-flex flex-wrap` in the parent grid so tiles wrap and space evenly

### 4. Added `HourlyForecastList`

This component:

* Receives the full hourly dataset from the hook
* Receives `selectedDate` from WeekPage
* Splits `"YYYY-MM-DDTHH:MM"` into date + time
* Filters the hours to match whatever day was clicked
* Renders a simple time → temperature list

In the future, I'd like to figure out how to remove the date from the time string for the data that's shown on the page.

### 5. Updated WeekPage to render both Daily + Hourly

After selecting a day:

* The daily tiles highlight
* The hourly list automatically updates
* No routing changes were required since everything lives inside WeekPage

### 6. Bootstrap Styling + UI Improvements

I used Bootstrap to:

* Wrap the daily cards using a flexible grid layout
* Keep the buttons compact while still interactive
* Add hover, active, and selected states
* Add spacing between tiles using flex utilities

### 7. Stylelint Fixes for Day 4

I ran the linters after finishing the UI updates. Everything was clean except for three SCSS issues regarding color notation:

* Expected "rgba" to be "rgb"
* Expected modern color-function notation
* Expected "0.758" to be "75.8%"

Fixes applied:
Converted this - rgba(65, 0, 109, 0.758) into this format - background-color: rgb(65 0 109 / 75.8%);

After updating it, all linters passed with no remaining errors.

### 8. Fixing Console Bugs and Units not toggling

So I noticed when I came back to this before starting Day 5, that the Temperature Units weren't changing like they should. I thought about when they last worked, which was before I applied the Bootstrap styles to that component. I checked the console logs and the errors were definitely coming from that component when I tried to make a change.

So I did some research and looked at the Bootstrap with React Documentation. That looked correct, and it styled like I wanted. So I looked at the React documentation on form select. That led me to learn that when I had put in the Form.Select on the styling for bootstrap, I had essentially moved my select line. So I moved up the key, value and onChange code to the Form.Select line as shown below and the toggle then worked on all pages.

```jsx
<div className="units-toggle">
    <Form.Select id="units-select"
      title="Units" value={units}
      onChange={handleChange} >
        <option value="metric">Metric (°C, km/h)</option>
        <option value="imperial">Imperial (°F, mph)</option>
    </Form.Select>
  </div>
```

### What I Learned on Day 4

* How to build multi-component pages that share state
* Got more practice transforming API data with `.map()` and `.filter()`, especially using them on real hourly forecast data instead of simple example arrays.
* How to split a timestamp string in JavaScript (`"T"` separator)
* How to create interactive UI elements (daily tiles)
* How to style selected vs. hover vs. default states
* How to wire Bootstrap utilities into React layouts
* The difference between CSS and SCSS and how to use nested selectors
* How to clean up SCSS to satisfy strict Stylelint rules

## Day 5 - Bundling and Publishing



## Resources

* React Router Tutorial (with JSX examples):
  This was the only video that matched the JSX-based approach we’re using in class.
  [https://www.youtube.com/watch?v=qi32YwjoN2U&amp;t=270s](https://www.youtube.com/watch?v=qi32YwjoN2U&t=270s)
* React Bootstrap docs for how to use and styling - [https://react-bootstrap.netlify.app/docs](https://react-bootstrap.netlify.app/docs)
* Bootstrap 5.3 documentation: [https://getbootstrap.com/docs/5.3](https://getbootstrap.com/docs/5.3)
* String `.split()` explanation (used for hourly timestamps):[https://www.youtube.com/watch?v=couYPD-SYww](https://www.youtube.com/watch?v=couYPD-SYww)
* W3Schools - JavaScript String Split(): [https://www.w3schools.com/jsref/jsref_split.asp](https://www.w3schools.com/jsref/jsref_split.asp)
* Open-Meteo API documentation  - [https://open-meteo.com/](https://open-meteo.com/)

