//IMPORTS
// Importing routing tools from React Router:
// BrowserRouter → turns routing on
// Routes → wrapper that holds all <Route> rules
// Route → defines which component shows for a URL
// NavLink → link that auto-highlights when active
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
// Imports Shared layout wrapper (header + footer)
import MainLayout from "../components/layout/MainLayout";
// Imports the pages this router will display
import TodayPage from "../pages/TodayPage";
import WeekPage from "../pages/WeekPage";
import AboutPage from "../pages/AboutPage";
import NotFoundPage from "../pages/NotFoundPage";

// AppRouter is the “map” of our app.
//  * It connects a URL → a page component.
//  * Example:
//  *   "/" → TodayPage
//  *   "/week" → WeekPage
//  *
//  * It also wraps everything in MainLayout so all pages
//  * share the same header and footer.
function AppRouter() {
  return (
    // BrowserRouter enables client-side navigation. Without this, NavLink and Routes will NOT work.
    // MainLayout wraps all pages with header + footer
    // Nav is a simple navigation bar.
    // NavLink adds an automatic "active" style. The inline margin is temporary spacing.
    // "end" tells React Router: Only mark this active when URL is EXACTLY "/"
    //NavLink to the weekly forecast page
    <BrowserRouter>
      <MainLayout>
        <nav className="card" style={{ marginBottom: "1rem" }}>
          <NavLink to="/" end>
            Today
          </NavLink>
          {" | "}
          <NavLink to="/week">Week</NavLink>
          {" | "}
          <NavLink to="/about">About</NavLink>
        </nav>

        {/* We define the routes here */}
        <Routes>
          <Route path="/" element={<TodayPage />} />
          <Route path="/week" element={<WeekPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
//  ROUTES SECTION
// <Routes> holds all <Route> definitions.
// Each <Route> describes:
//  - which URL to match (path)
//  - which component to show (element)

//Home page: URL "/" shows TodayPage
// Weekly forecast: URL "/week" shows WeekPage

export default AppRouter;
