import { Link } from "react-router-dom";
import { FacebookIcon, TwitterIcon, InstagramIcon } from "lucide-react"; // Updated icons

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-700 pb-6">
          {/* Logo */}
          <div className="text-2xl font-bold text-accent mb-4 md:mb-0">
            Service Finder
          </div>

          {/* Navigation */}
          <nav className="flex space-x-6">
            <Link to="/services" className="hover:text-accent">Find Services</Link>
            <Link to="/how-it-works" className="hover:text-accent">How It Works</Link>
            <Link to="/contact" className="hover:text-accent">Contact Us</Link>
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="mt-6 flex flex-col md:flex-row justify-between items-center">
          {/* Social Icons */}
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="#" className="hover:text-accent">
              <FacebookIcon size={24} />
            </a>
            <a href="#" className="hover:text-accent">
              <TwitterIcon size={24} />
            </a>
            <a href="#" className="hover:text-accent">
              <InstagramIcon size={24} />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Service Finder. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
