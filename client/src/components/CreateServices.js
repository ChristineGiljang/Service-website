import { useEffect, useState } from "react";
import AvailabilityCalendar from "./AvailabilityCalendar";

const categories = [
  { name: "Home & Maintenance Services", services: ["House Cleaning", "Plumbing", "Handyman Services", "Pest Control", "HVAC Repair & Maintenance", "Home Renovation & Remodeling"] },
  { name: "Property Maintenance & Landscaping", services: ["Lawn Care & Mowing", "Tree Trimming & Removal", "Irrigation System Installation & Repair", "Pressure Washing (Driveways, Decks, Buildings)", "Gutter Cleaning", "Fence & Deck Installation/Repair"] },
  { name: "Health & Personal Care", services: ["Massage Therapy", "Personal Training", "Physical Therapy", "Haircuts & Barber Services", "Makeup & Beauty Services", "Spa & Wellness Treatments"] },
  { name: "Automotive Services", services: ["Car Repair & Maintenance", "Mobile Car Wash", "Car Detailing", "Tire Changes & Alignments", "Roadside Assistance & Towing"] },
  { name: "Event & Hospitality Services", services: ["Catering Services", "Event Planning", "Photography & Videography", "DJ & Entertainment Services"] },
  { name: "Pet Services", services: ["Dog Walking", "Pet Grooming", "Pet Sitting & Boarding", "Pet Training", "Pet Waste Removal"] },
  { name: "Child & Senior Care", services: ["Babysitting & Nanny Services", "Senior Care & Assistance", "Tutoring & In-Home Education"] },
];

const allSkills = categories.flatMap(category => category.services);

const CreateService = ({ providerId }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location:"",
    skills: [],
    images: [],
    price: "",
    availability: {},
  });

  const [step, setStep] = useState(1);
  const [userId, setUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSkills, setFilteredSkills] = useState(allSkills);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSkillInputChange = (e) => {
    const input = e.target.value;
    setSearchTerm(input);
    setFilteredSkills(allSkills.filter(skill => skill.toLowerCase().includes(input.toLowerCase())));
  };

  const handleSelectSkill = (skill) => {
    if (!formData.skills.includes(skill) && formData.skills.length < 5) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skill],
      }));
    }
    setSearchTerm(""); // Clear input after selection
  };
  const removeSkill = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
  
    // Convert files to URLs or process as needed
    const imageUrls = await Promise.all(
      files.map(async (file) => {
        return URL.createObjectURL(file); // Temporary URL (Replace with actual upload logic)
      })
    );
  
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...imageUrls], // Ensure it's an array of strings
    }));
  };
  

  const handleFinish = async (schedule) => {
    try {
      const cleanedSchedule = JSON.parse(JSON.stringify(schedule)); // Prevent circular structure error

      const response = await fetch("http://localhost:5000/api/create-service", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId || providerId || localStorage.getItem("userId"),
          name: formData.name,
          location: formData.location,
          description: formData.description,
          skills: formData.skills,
          images: formData.images.map((img) => (typeof img === "string" ? img : "")),
          price: formData.price,
          availability: cleanedSchedule, // Use cleaned schedule data
        }),
      });

      const result = await response.json();
      console.log("Server Response:", result);

      if (response.ok) {
        alert("Service saved successfully!");
      } else {
        alert("Failed to save service.");
      }
    } catch (error) {
      console.error("Error saving service:", error);
      alert("Error connecting to server.");
    }
  };
  
  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
      {step === 1 ? (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Create a New Service</h2>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Service Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
            <textarea
              name="description"
              placeholder="Service Description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            ></textarea>

            <textarea
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            ></textarea>

            <div>
              <h3 className="font-semibold mb-2">Select up to 5 skills:</h3>
              <input
                type="text"
                placeholder="Search skills"
                value={searchTerm}
                onChange={handleSkillInputChange}
                className="w-full p-2 border rounded"
              />
              {searchTerm && (
                <div className="border mt-1 rounded shadow bg-white max-h-40 overflow-auto">
                  {filteredSkills.map((skill, index) => (
                    <div
                      key={index}
                      onClick={() => handleSelectSkill(skill)}
                      className="p-2 cursor-pointer hover:bg-gray-200"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              )}

                <div className="mt-2">
                  {formData.skills.map((skill, index) => (
                    <span key={index} className="inline-block bg-gray-200 text-gray-800 px-2 py-1 rounded mr-2">
                      {skill}
                      <button onClick={() => removeSkill(skill)} className="ml-1 text-red-500">✕</button>
                    </span>
                  ))}
                </div>
              </div>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full p-2 border rounded"
            />

            <input
              type="number"
              name="price"
              placeholder="Price ($)"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />

            <button
              type="button"
              onClick={() => setStep(2)} // Go to the availability step
              className="p-2 bg-blue-500 text-white rounded mt-4"
            >
              Next: Set Availability
            </button>
          </form>
        </div>
      ) : (
        <AvailabilityCalendar onPrevious={() => setStep(1)} onFinish={handleFinish} />
      )}
    </div>
  );
};

export default CreateService;
