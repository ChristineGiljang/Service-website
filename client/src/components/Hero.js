import { useState } from "react";
import { Search } from "lucide-react";

// Categories Data
const categories = [
    { name: "Home & Maintenance Services", services: ["House Cleaning", "Plumbing", "Handyman Services", "Pest Control", "HVAC Repair & Maintenance", "Home Renovation & Remodeling"] },
    { name: "Property Maintenance & Landscaping", services: ["Lawn Care & Mowing", "Tree Trimming & Removal", "Irrigation System Installation & Repair", "Pressure Washing (Driveways, Decks, Buildings)", "Gutter Cleaning", "Fence & Deck Installation/Repair"] },
    { name: "Health & Personal Care", services: ["Massage Therapy", "Personal Training", "Physical Therapy", "Haircuts & Barber Services", "Makeup & Beauty Services", "Spa & Wellness Treatments"] },
    { name: "Automotive Services", services: ["Car Repair & Maintenance", "Mobile Car Wash", "Car Detailing", "Tire Changes & Alignments", "Roadside Assistance & Towing"] },
    { name: "Event & Hospitality Services", services: ["Catering Services", "Event Planning", "Photography & Videography", "DJ & Entertainment Services"] },
    { name: "Pet Services", services: ["Dog Walking", "Pet Grooming", "Pet Sitting & Boarding", "Pet Training", "Pet Waste Removal"] },
    { name: "Child & Senior Care", services: ["Babysitting & Nanny Services", "Senior Care & Assistance", "Tutoring & In-Home Education"] },
];

// Flatten all services for searching
const allServices = categories.flatMap(category => category.services);

const Hero = ({ searchTerm, setSearchTerm }) => {
  const [filteredServices, setFilteredServices] = useState([]);

  // Handle search input changes
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      const results = allServices.filter(service =>
        service.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredServices(results);
    } else {
      setFilteredServices([]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center py-32 px-6 bg-gray-100">
      <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
        Book Your Needed Services Today
      </h1>
      <p className="text-gray-600 text-lg md:text-xl mb-8">
        Find reliable services near you with just one search.
      </p>

      {/* Search Bar */}
      <div className="relative w-full max-w-lg">
        <div className="flex items-center bg-white border border-gray-300 shadow-md rounded-full px-4 py-3 w-full">
          <Search className="text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Search for services..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full bg-transparent outline-none px-3 text-gray-700"
          />
          <button className="bg-teal-600 text-white px-6 py-2 rounded-full hover:bg-teal-700 transition">
            Search
          </button>
        </div>

        {/* Dropdown for suggestions */}
        {filteredServices.length > 0 && (
          <ul className="absolute bg-white border border-gray-300 w-full rounded-md mt-2 shadow-md z-10">
            {filteredServices.map((service, index) => (
              <li 
                key={index} 
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  setSearchTerm(service);
                  setFilteredServices([]); // Hide dropdown on selection
                }}
              >
                {service}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const CategoriesList = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
        Categories
      </h1>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <div key={index} className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">{category.name}</h2>
            <ul className="space-y-1">
              {category.services.map((service, i) => (
                <li key={i}>
                  <a href="#" className="text-blue-600 hover:underline">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <Hero searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <CategoriesList />
    </div>
  );
};

export default Home;
