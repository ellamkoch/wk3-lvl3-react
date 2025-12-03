// Import the shared layout pieces
import Header from "./Header";
import Footer from "./Footer";

//  * MainLayout Component
// WHAT THIS DOES:
//  * - Provides a consistent layout for every route ("/", "/about", etc.)
//  * - Wraps each page with:
//  *      <Header />
//  *      {children}   <-- the specific page's content
//  *      <Footer />
//  *
//  * WHY WE USE CHILDREN:
//  * - In React, "children" represents whatever you wrap inside this component.
//  *   Example:
//  *        <MainLayout>
//  *            <TodayPage />   <-- becomes children
//  *        </MainLayout>
//  *
//  * - This allows us to reuse the same header and footer across all pages
//  *   without copying/pasting them into each page file.
//  *
//  * ABOUT THE CLASSNAME:
//  * - "app-shell" is just a styled container for the whole app.
//  *
//  * PROPS:
//  * - { children } is the only prop here.
//  * - We destructure the prop directly in the function signature.
//  */

// In JSX and React, when a function receives a param, we call it a prop
// Information a parent component passes down to a child component Props = properties.
/**
 * AppLayout wraps pages with a shared header and footer.
 *
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - Page content.
 */
function MainLayout({ children }) {
  return (
    <div className="app-shell">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default MainLayout;
// This produces a
// HEADER
// → whatever page you passed in (TodayPage, AboutPage, etc.)
// FOOTER
// This is why the layout wraps every page without needing to rewrite header/footer each time.
