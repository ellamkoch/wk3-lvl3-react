
// App.jsx is the “map” of your whole application.
//  * WHAT THIS DOES RIGHT NOW:
//  * - Renders the MainLayout wrapper (Header + Footer).
//  * - Displays ONLY the TodayPage inside that layout.

//importing pages
// App.jsx imports pages ONLY because routing needs them
import MainLayout from "./components/layout/MainLayout";
import TodayPage from "./pages/TodayPage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";


// We need to import the global styles so they apply to the whole app
import "./styles/main.scss";

/**
 * Root application component.
 * For Day 1 we render only the TodayPage.
 */
function App() {

  return ( // Renders the MainLayout component, and puts TodayPage INSIDE of it.”
    <Router>
      <Routes>
        <Route path ="/">
    //MainLayout wraps whatever you put inside it with header/footer, page content, etc.
    <MainLayout>
      <TodayPage />
    </MainLayout>
      </Routes>
    </Router>
  );
}

export default App;
