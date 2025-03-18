import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/NavBar";
import Hero from "../components/layout/Hero";
import HowItWorksHero from "../components/layout/Howitworks"; // Import How It Works Hero

const Layout = () => {
  const location = useLocation(); // Get current route

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Show Hero Section only on the Home Page */}
      {location.pathname === "/" && (
        <>
          <Hero />
          <HowItWorksHero /> {/* Insert How It Works Hero here */}
        </>
      )}

      <main className="flex-1">
        <Outlet /> {/* This will render other pages */}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
