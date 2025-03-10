import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; 
import './App.css';
import HomePage from "./Pages/HomePage";
import Home from './components/Home'

function App() {
  return(
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={< HomePage />} />
          <Route path="/home" element={<Home />} /> 
        </Routes>
      </Router>
    </AuthProvider>  
  )
}

export default App;
