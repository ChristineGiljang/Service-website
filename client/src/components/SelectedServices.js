import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const SelectedService = () => {
  const location = useLocation();
  const selectedService = location.state?.service || "No service selected";

  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [locationOptions, setLocationOptions] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            if (data && data.display_name) {
              setLocationOptions([data.display_name]);
            } else {
              setLocationOptions(["Location not found"]);
            }
          } catch (error) {
            console.error("Error fetching address:", error);
            setLocationOptions(["Error fetching location"]);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocationOptions(["Location access denied"]);
        }
      );
    } else {
      setLocationOptions(["Geolocation not supported"]);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestData = {
      service: selectedService,
      description,
      address,
      date,
      time,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/service-request",
        requestData
      );
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error submitting request:", error);
      setMessage("Failed to submit request");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Selected Service</h1>
      <p className="text-lg text-gray-700 font-semibold">{selectedService}</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block font-medium text-gray-700">Description:</label>
          <textarea
            className="w-full p-2 border rounded-md"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter details..."
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Location:</label>
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter location..."
          />
          {locationOptions.length > 0 && (
            <select
              className="w-full p-2 mt-2 border rounded-md"
              onChange={(e) => setAddress(e.target.value)}
            >
              <option value="">Use detected location</option>
              {locationOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
        </div>

        <div>
          <label className="block font-medium text-gray-700">Date:</label>
          <input
            type="date"
            className="w-full p-2 border rounded-md"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Time:</label>
          <input
            type="time"
            className="w-full p-2 border rounded-md"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold p-2 rounded-md hover:bg-blue-700"
        >
          Submit
        </button>

        {message && <p className="text-green-600 mt-2">{message}</p>}
      </form>
    </div>
  );
};

export default SelectedService;
