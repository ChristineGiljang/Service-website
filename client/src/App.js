import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from './Pages/LandingPage'
import ProfilePage from "./Pages/ProfilePage";

function App() {
return(
  <Router>
    <Routes>
      <Route path="/" element={< NavBar />} />
      <Route path="/profile" element={< ProfilePage />} />
    </Routes>
  </Router>
)
}

export default App;
