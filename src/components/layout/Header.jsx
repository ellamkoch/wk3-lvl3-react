/**
 * Application header.
 * Displays app title and small description.
 */
// * WHAT THIS DOES:
//  * - Acts as the top section of the app layout (like a banner).
//  * - Displays the main title and a short description of what the app does.
//  *
//  * WHY IT MATTERS:
//  * - This component will appear on every page because it's included
//  *   inside your shared layout (MainLayout).
//  * - Helps keep repeated UI separated into reusable pieces.
//  *
//  * ABOUT THE CLASS NAMES:
//  * - "app-header" is the root container.
//  * - "app-header__title" and "app-header__subtitle" follow a simple BEM style.
//  *   This makes them easy to target in your SCSS without confusion.

function Header() {
  return (
    <header className="app-header">
      <h1 className="app-header__title">Weather App</h1>
      <p className="app-header__subtitle">
        Search any city and explore today&apos;s weather and the forecast.
      </p>
    </header>
  );
}

export default Header;
