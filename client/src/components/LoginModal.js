import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import ForgotPasswordModal from "./ForgotPasswordModal";

const LoginModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false); 
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (name === "email") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: value.includes("@") ? "" : "Enter a valid email",
      }));
    }

    if (name === "password") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: value.length >= 6 ? "" : "Password must be at least 6 characters",
      }));
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Logging in with:", formData);
  
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });
  
      const data = await response.json();
      console.log("Server Response:", data);
  
      if (response.ok) {
        // ✅ Store user data correctly
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.user.email); // Fix: Get email from user object
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("isLoggedIn", "true");
  
        // ✅ Trigger navbar update
        window.dispatchEvent(new Event("userLoggedIn"));
  
        // ✅ Close modal
        onClose();
        navigate("/profile");
  
        console.log("Login successful!");
      } else {
        alert(data.message || "Login failed.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again.");
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
              alt="Login Visual"
              src="https://img.freepik.com/free-photo/top-view-mechanical-supplies-composition_23-2149552422.jpg?ga=GA1.1.789066035.1742101396&semt=ais_hybrid"
              className="h-full w-full object-cover rounded-l-lg"
            />
          </aside>

          <main className="p-8 lg:col-span-2">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">Welcome Back</h1>
            <p className="mt-4 text-gray-500">Login to continue</p>

            <form className="mt-8 grid grid-cols-6 gap-6" onSubmit={handleLogin}>
              <div className="col-span-6">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={`mt-1 w-full rounded-md border ${
                    errors.email ? "border-red-500" : "border-gray-200"
                  } bg-white text-sm text-gray-700 shadow-xs`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div className="col-span-6">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={`mt-1 w-full rounded-md border ${
                    errors.password ? "border-red-500" : "border-gray-200"
                  } bg-white text-sm text-gray-700 shadow-xs`}
                />
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4 justify-between pt-10">
                <button
                  type="submit"
                  className="inline-block rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:ring-3 focus:outline-none"
                  disabled={!formData.email || !formData.password || errors.email || errors.password}
                >
                  Login
                </button>
                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  <a onClick={() => setForgotPasswordOpen(true)} 
                     className="text-gray-700 underline cursor-pointer">Forgot Password?</a>
                </p>
              </div>
            </form>
          </main>
        </div>
      </section>
      <ForgotPasswordModal isOpen={forgotPasswordOpen} onClose={() => setForgotPasswordOpen(false)} />
    </div>
  );
};

export default LoginModal;
