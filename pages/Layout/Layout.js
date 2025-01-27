import Footer from "../Footer/Footer";
import NavBar from "../Header/Navbar";
import SearchComponent from "../Header/SearchComponent";

export const Layout = ({ children }) => {
  // layout for the website
  return (
    <>
      <header className="header">
        <NavBar />
      </header>

      <main className="content">{children}</main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};
export default Layout;
