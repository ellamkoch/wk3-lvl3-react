import AppRouter from "./router/AppRouter";

// We need to import the styles
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/main.scss";

/**
 * Root application component.
 * For Day 1 we render only the TodayPage.
 */
function App() {
  return (
    <AppRouter />
  );
}

export default App;
