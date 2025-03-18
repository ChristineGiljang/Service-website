import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react"; 
import Input from "../ui/Input"; 
import Button from "../ui/Button";


const SignUpModal = ({ isOpen, onClose, switchToLogin }) => {
  const navigate = useNavigate(); 
  const [openSignUp, setOpenSignUp] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    type: "worker",
  });

  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  const validatePassword = (password) => {
    const minLength = /.{8,}/; // At least 8 characters
    const uppercase = /[A-Z]/; // At least 1 uppercase letter
    const number = /[0-9]/; // At least 1 number
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/; // At least 1 special character

    if (!minLength.test(password)) return "Password must be at least 8 characters long.";
    if (!uppercase.test(password)) return "Password must contain at least one uppercase letter.";
    if (!number.test(password)) return "Password must contain at least one number.";
    if (!specialChar.test(password)) return "Password must contain at least one special character.";
    
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value })); 

    if (name === "password") {
      const errorMsg = validatePassword(value);
      setErrors({ ...errors, password: errorMsg });
    }

    if (name === "confirmPassword") {
      setErrors({
        ...errors,
        confirmPassword: value !== formData.password ? "Passwords do not match." : "",
      });
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log("Sending data to backend:", formData);
    try {
    const response = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
    });

    const data = await response.json(); 
    console.log("Server response:", data);

    if (response.ok) {
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("user", JSON.stringify({ username: formData.username, type: formData.type }));

        onClose(); 
        navigate("/profile");
      } else {
        alert("Signup failed: " + data.message);
      }
    } catch (error) {
    console.error("Signup error:", error);
    }
};


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <section className="bg-white rounded-lg shadow-lg w-full max-w-4xl relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <X size={24} />
        </button>
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <aside className="hidden lg:block lg:col-span-1">
          <img
            alt="Signup Visual"
            src="https://img.freepik.com/free-photo/top-view-mechanical-supplies-composition_23-2149552422.jpg?ga=GA1.1.789066035.1742101396&semt=ais_hybrid"
            className="h-full w-full object-cover rounded-l-lg"
          />
        </aside>

        <main className="p-8 lg:col-span-2">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">Sign Up to be a Service Pro</h1>
          <p className="mt-4 text-gray-500">Become a Service Provider & Grow Your Business</p>

          <form 
            className="mt-8 grid grid-cols-6 gap-6"
            onSubmit={handleSignUp}>

            <div className="col-span-6 sm:col-span-6">
              <Input 
                type="text"
                id="Username"
                name="username"
                label="Username"
                value={formData.username}
                onChange={handleChange}
             />
            </div>

            <div className="col-span-6">
              <Input 
                type="email" 
                id="Email"
                name="email"
                label="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <Input 
                  type="password" 
                  name="password"
                  id="Password"
                  label="Password"
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <Input 
                type="password" 
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password" 
                value={formData.confirmPassword} 
                onChange={handleChange}    
                error={errors.confirmPassword}   
              />
            </div>

            <div className="col-span-6">
              <p className="text-sm text-gray-500">
                By creating an account, you agree to our
                <a href="#" className="text-gray-700 underline"> terms and conditions </a>
                and
                <a href="#" className="text-gray-700 underline"> privacy policy</a>.
              </p>
            </div>
            <div className="col-span-6 sm:flex sm:items-center sm:gap-4 justify-between">
            <Button
              type="submit"
              variant="outline"
              label="Create an Account"
              disabled={errors.password || errors.confirmPassword || !formData.password || !formData.confirmPassword || !!errors.password} 
            />
              <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                Already have an account?
                <a onClick={switchToLogin} className="text-gray-700 underline cursor-pointer"> Log in</a>.
              </p>
            </div>
          </form>
        </main>
      </div>
    </section>
  </div>
);
}

export default SignUpModal;
