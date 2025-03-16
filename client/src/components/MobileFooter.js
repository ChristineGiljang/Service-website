import { User, Briefcase, BookMarked, Mail, Home} from "lucide-react";

const MobileFooter = ({ setActiveComponent }) => {
    return (
        <div className="md:hidden fixed bottom-0 left-0 w-full bg-white shadow-md border-t border-gray-200 flex justify-around py-3">
          <button
            className="flex flex-col items-center text-gray-700 hover:text-blue-600"
            onClick={() => setActiveComponent("AccountPreferences")}
          >
            <User size={24} />
            <span className="text-xs">Account</span>
          </button>
          <button
            className="flex flex-col items-center text-gray-700 hover:text-blue-600"
            onClick={() => setActiveComponent("PostServices")}
          >
            <Briefcase size={24} />
            <span className="text-xs">Services</span>
          </button>
          <button
            className="flex flex-col items-center text-gray-700 hover:text-blue-600"
            onClick={() => setActiveComponent("AccountPreferences")}
          >
            <Home size={24} />
            <span className="text-xs">Home</span>
          </button>
          <button
            className="flex flex-col items-center text-gray-700 hover:text-blue-600"
            onClick={() => setActiveComponent("SavedServices")}
          >
            <BookMarked size={24} />
            <span className="text-xs">Saved</span>
          </button>
          <button
            className="flex flex-col items-center text-gray-700 hover:text-blue-600"
            onClick={() => setActiveComponent("Inbox")}
          >
            <Mail size={24} />
            <span className="text-xs">Inbox</span>
          </button>
        </div>
      );
  };

  export default MobileFooter;