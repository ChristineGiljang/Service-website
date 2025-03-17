import { useState } from "react";
import { useNavigate } from "react-router-dom";

const categories = [
    {
      name: "Home & Maintenance Services",
      services: [
        "House Cleaning",
        "Plumbing",
        "Handyman Services",
        "Pest Control",
        "HVAC Repair & Maintenance",
        "Home Renovation & Remodeling",
      ],
    },
    {
        name: "Property Maintenance & Landscaping",
        services: [
          "Lawn Care & Mowing",
          "Tree Trimming & Removal",
          "Irrigation System Installation & Repair",
          "Pressure Washing (Driveways, Decks, Buildings)",
          "Gutter Cleaning",
          "Fence & Deck Installation/Repair",
        ],
      },
    {
      name: "Health & Personal Care",
      services: [
        "Massage Therapy",
        "Personal Training",
        "Physical Therapy",
        "Haircuts & Barber Services",
        "Makeup & Beauty Services",
        "Spa & Wellness Treatments",
      ],
    },
    {
      name: "Automotive Services",
      services: [
        "Car Repair & Maintenance",
        "Mobile Car Wash",
        "Car Detailing",
        "Tire Changes & Alignments",
        "Roadside Assistance & Towing",
      ],
    },
    {
      name: "Event & Hospitality Services",
      services: [
        "Catering Services",
        "Event Planning",
        "Photography & Videography",
        "DJ & Entertainment Services",
      ],
    },
    {
      name: "Pet Services",
      services: [
        "Dog Walking",
        "Pet Grooming",
        "Pet Sitting & Boarding",
        "Pet Training",
        "Pet Waste Removal",
      ],
    },
    {
        name: "Child & Senior Care",
        services: [
          "Babysitting & Nanny Services",
          "Senior Care & Assistance",
          "Tutoring & In-Home Education",
        ],
      },
  ];

  const CategoriesList = ({ setSelectedService }) => {
    const navigate = useNavigate();
    return (
      <div className="max-w-7xl mx-auto p-6">
         <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
            Categories
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div key={index} className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">{category.name}</h2>
              <ul className="space-y-1">
                {category.services.map((service, i) => (
                  <li key={i}>
                    <a onClick={() => {
                        setSelectedService(service); // ✅ Update state
                        navigate("/selectedservices", { state: { service } });; // ✅ Navigate to SelectedService
                      }} 
                      className="text-blue-600 hover:underline">
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

  export default CategoriesList;