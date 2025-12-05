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
I wathced videos by Traversy & Net Ninja first, but the one that helped the most is listed in the Resources section below.

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
* Added active-state underline styling using React Router’s `<NavLink>`.
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

## Resources

* React Router Tutorial (with JSX examples):
  This was the only video that matched the JSX-based approach we’re using in class.
  [https://www.youtube.com/watch?v=qi32YwjoN2U&amp;t=270s](https://www.youtube.com/watch?v=qi32YwjoN2U&t=270s)
  * React Bootstrap docs for how to use and styling - [https://react-bootstrap.netlify.app/docs](https://react-bootstrap.netlify.app/docs)



