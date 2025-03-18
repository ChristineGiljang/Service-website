import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BluetoothIcon, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { handleLogin } from "../../Services/authServices";
import Input from "../ui/Input"; 
import ForgotPasswordModal from "../ForgotPasswordModal";
import Button from "../ui/Button";

const LoginModal = ({ isOpen, onClose }) => {
  const { login, user } = useAuth();
  console.log("Extracted login function:", login);
  const auth = useAuth();
  console.log("useAuth() output:", auth);
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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Email:", formData.email, "Password:", formData.password); // 🔍 Debugging
    handleLogin(formData.email, formData.password, login, navigate);
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

            <form className="mt-8 grid grid-cols-6 gap-6" onSubmit={handleSubmit}>
              <div className="col-span-6">
              <Input
                type="email"
                id="Email"
                name="email"
                label="Email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />
              </div>

              <div className="col-span-6">
              <Input
                type="password"
                id="Password"
                name="password"
                label="Password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
              />
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4 justify-between pt-10">
                <Button
                  type="submit"
                  variant="outline"
                  label="Login"
                  disabled={!formData.email || !formData.password || errors.email || errors.password}
                />
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
