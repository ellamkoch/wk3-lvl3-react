/**
 Footer component for the whole application.
 * * Attribution to Frontend Mentor challenge and API provider.
 */
// WHY THIS EXISTS:
//  * - A layout usually has a Header, Main content, and a Footer.
//  * - This footer stays the same on every route ("/", "/about", etc.)
//  *   because the Layout wraps all pages.
//  * WHAT IT DOES:
//  * - Renders simple attribution text.
//  * - Uses a CSS class ("app-footer") so you can style it in SCSS.
//  *
//  * NOTE:
//  * - This component has no props and no state — it's purely presentational.
//  */

export default function Footer() {
  return (
    <footer className="app-footer">
      <p>
        Challenge by Frontend Mentor - Weather App using Open-Meteo API.
      </p>
      <p>Built in class with React + Vite.</p>
    </footer>
  );
}
