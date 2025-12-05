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

//Nav Bar Imports for Bootstrap
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


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
    //Navbar is for styling the navbar with bootstrap/react
    //container tells bootstrap its a container
    // Nav is a simple navigation bar.
    // NavLink adds an automatic "active" style. The inline margin is temporary spacing.
    // "end" tells React Router: Only mark this active when URL is EXACTLY "/"
    //NavLink to the weekly forecast page
    <BrowserRouter>
      <MainLayout>
        <Navbar data-bs-theme="dark">
        <Container>
          <Nav variant="underline" defaultActiveKey="/" className="navbar-links d-flex p-4" style={{ marginBottom: "1rem" }}>
            <NavLink  to="/" end className={({ isActive }) => `nav-link ${isActive ? "nav-link-active" : ""}`
        }>
              Today
            </NavLink >
            {" "}
            <NavLink  to="/week" className={({ isActive }) => `nav-link ${isActive ? "nav-link-active" : ""}`}
            >Week
            </NavLink>
            {" "}
            <NavLink  to="/about" className={({ isActive }) => `nav-link ${isActive ? "nav-link-active" : ""}`}>
            About
            </NavLink >
          </Nav>
      </Container>
    </Navbar>

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
