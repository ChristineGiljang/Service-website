import { User, Lock, BookMarked, Mail } from "lucide-react";
import Navbar from "./NavBar";
import AccountPreferences from "./AccountPreferences";

const Sidebar = () => {
    return (
        <div className="max-w-lg bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Account</h2> 
          
          <ul className="space-y-4">
            <li className="flex items-center space-x-3 text-blue-600 font-medium cursor-pointer hover:text-blue-600">
              <User size={20} />
              <span>Account Information</span>
            </li>
            <li className="flex items-center space-x-3 text-gray-700 cursor-pointer hover:text-blue-600">
              <Lock size={20} />
              <span>Post your services</span>
            </li>
            <li className="flex items-center space-x-3 text-gray-700 cursor-pointer hover:text-blue-600">
              <BookMarked size={20} />
              <span>Saved services</span>
            </li>
            <li className="flex items-center space-x-3 text-gray-700 cursor-pointer hover:text-blue-600">
              <Mail size={20} />
              <span>Inbox</span>
            </li>
          </ul>
        </div>
    );
    };

const Layout = () => {
  return (
    <>
       <Navbar />  
      <div className="flex gap-6 p-6 max-w-7xl mx-auto">
        <div className="w-64"> {/* Fixed width for Sidebar */}
          <Sidebar />
        </div>
        <div className="flex-1"> {/* AccountPreferences takes remaining space */}
          <AccountPreferences />
        </div>
      </div>
    </>
  );
};

export default Layout;
