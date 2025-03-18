import { useState } from "react";
import { User, Briefcase, BookMarked, Mail } from "lucide-react";
import Navbar from "./layout/NavBar";
import AccountPreferences from "./AccountPreferences";
import MobileFooter from "./MobileFooter";
import CreateService from "./CreateServices";
import Calendar from "./Calendar";

const Sidebar = ({ setActiveComponent }) => {
    return (
        <div className="hidden md:block bg-white p-6 rounded-xl shadow-md border border-gray-200 w-64">
          <h2 className="text-lg font-semibold mb-4">Account</h2>
    
          <ul className="space-y-4">
            <li
              className="flex items-center space-x-3 ext-gray-700 cursor-pointer hover:text-blue-600"
              onClick={() => setActiveComponent("AccountPreferences")}
            >
              <User size={20} />
              <span>Account Information</span>
            </li>
            <li
              className="flex items-center space-x-3 text-gray-700 cursor-pointer hover:text-blue-600"
              onClick={() => setActiveComponent("PostServices")}
            >
              <Briefcase size={20} />
              <span>Post your services</span>
            </li>
            <li
              className="flex items-center space-x-3 text-gray-700 cursor-pointer hover:text-blue-600"
              onClick={() => setActiveComponent("Calendar")}
            >
              <BookMarked size={20} />
              <span>Saved services</span>
            </li>
            <li
              className="flex items-center space-x-3 text-gray-700 cursor-pointer hover:text-blue-600"
              onClick={() => setActiveComponent("Inbox")}
            >
              <Mail size={20} />
              <span>Inbox</span>
            </li>
          </ul>
        </div>
      );
    };

const Layout = () => {
    const [activeComponent, setActiveComponent] = useState("AccountPreferences");

    const renderComponent = () => {
        switch (activeComponent) {
        case "AccountPreferences":
            return <AccountPreferences />;
        case "PostServices":
            return <CreateService />;
         case "Calendar":
             return <Calendar />;
        // case "Inbox":
        //     return <Inbox />;
        default:
            return <AccountPreferences />;
        }
    };

    return (
    <>
    <Navbar />
        <div className="flex gap-6 p-6 max-w-7xl mx-auto pt-20">
                <Sidebar setActiveComponent={setActiveComponent} />
            <div className="flex-1">{renderComponent()}</div>
        </div>
    <MobileFooter setActiveComponent={setActiveComponent} />
    </>
  );
};

export default Layout;
