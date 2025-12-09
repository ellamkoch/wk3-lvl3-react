
/**
 * Initial Today page.
 * Static content just to validate layout, JSX and styling.
 *
  * WHAT THIS DOES RIGHT NOW:
 * - Renders a simple static "card" with placeholder text.
 * - Lets us verify that:
 *    - The layout works (header + footer + main content).
 *    - Our JSX is valid.
 *    - Our styles for `.card` are being applied.
 *
 * HOW THIS FITS IN:
 * - This is the main content for the "/" route (Home / Today page).
 * - Later, we will make this dynamic by:
 *    - Adding state for weather data.
 *    - Updating the UI using real API responses.
 *
 * NOTE:
 * - This component does NOT use props or state yet.
 *   It’s just a presentational starting point.
 */


function TodayPage() {
  return (
    <section className="card">
      <h2>Today&apos;s weather</h2>
      <p>
        This is a placeholder view. Tomorrow we will make this dynamic using
        React state and API data.
      </p>
      <p>ssoeasudhfklajsdfas</p>
    </section>
  );
}

export default TodayPage;
