import { useState } from "react";

const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`).map((h) => (
    <option key={h} value={h}>{h}</option>
  ));
  
  const PostServices = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
      name: "",
      description: "",
      address: "",
      openHours: "",
      pricing: "",
      images: [],
    });
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleImageChange = (e) => {
      const files = Array.from(e.target.files);
      setFormData({ ...formData, images: [...formData.images, ...files] });
    };
  
    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);
  
    return (
      <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200 w-96">
        {step === 1 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Service Details</h2>
            <input type="text" name="name" placeholder="Name of Service" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
            <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
            <select name="openHours" value={formData.openHours} onChange={handleChange} className="w-full p-2 border rounded mb-2">
              <option value="">Select Open Hours</option>
              {hours}
            </select>
            <input type="text" name="pricing" placeholder="Pricing" value={formData.pricing} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
            <button onClick={nextStep} className="w-full bg-blue-600 text-white p-2 rounded">Next</button>
          </div>
        )}
  
        {step === 2 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Upload Images</h2>
            <input type="file" multiple onChange={handleImageChange} className="w-full p-2 border rounded mb-2" />
            <div className="flex flex-wrap gap-2">
              {formData.images.map((file, index) => (
                <img key={index} src={URL.createObjectURL(file)} alt="preview" className="w-16 h-16 object-cover rounded" />
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <button onClick={prevStep} className="bg-gray-400 text-white p-2 rounded">Back</button>
              <button onClick={nextStep} className="bg-blue-600 text-white p-2 rounded">Next</button>
            </div>
          </div>
        )}
  
        {step === 3 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Review & Submit</h2>
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Description:</strong> {formData.description}</p>
            <p><strong>Address:</strong> {formData.address}</p>
            <p><strong>Open Hours:</strong> {formData.openHours}</p>
            <p><strong>Pricing:</strong> {formData.pricing}</p>
            <div className="flex gap-2 mt-2">
              {formData.images.map((file, index) => (
                <img key={index} src={URL.createObjectURL(file)} alt="preview" className="w-16 h-16 object-cover rounded" />
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <button onClick={prevStep} className="bg-gray-400 text-white p-2 rounded">Back</button>
              <button className="bg-green-600 text-white p-2 rounded">Submit</button>
            </div>
          </div>
        )}
      </div>
    );
  };

export default PostServices;
