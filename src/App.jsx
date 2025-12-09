
// App.jsx is the “map” of your whole application.
// AppRouter handles All Routing URLs -> page components)
//Imports appRouter function
import AppRouter from "./router/AppRouter";

// We need to import the global styles so they apply to the whole app
import "./styles/main.scss";

/**
 * Root application component.
 WHAT THIS DOES:
 * - Acts as the true “root” of the React app.
 * - Instead of holding any UI directly, it now delegates everything to AppRouter.
 */
//  WHY:
//  * - AppRouter contains the routing setup and decides
//  *   which page to show based on the URL.
//  * - Keeping App clean makes the project easier to scale.
function App() {
  return (
    // Renders the router, which will render the correct page.
    <AppRouter />
  );
}

export default App;
