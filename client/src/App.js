import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import NavBar from './Pages/LandingPage'
import ProfilePage from "./Pages/ProfilePage";
import AuthModal from "./components/Modal";
import CategoriesList from "./components/CategoriesList";
import SelectedService from "./components/SelectedServices";
import Dashboard from "./Pages/Dashboard";
import Layout from "./Pages/LandingPage";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

return(
  <Router>
    <AuthModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

    <Routes>
      <Route path="/" element={<Layout/>}/>
      <Route path="/profile" element={< ProfilePage />} />
      <Route path="/dashboard" element={< Dashboard/>}/>
      <Route path="/selectedservices" element={< SelectedService />} />
    </Routes>
  </Router>
)
}

export default App;
