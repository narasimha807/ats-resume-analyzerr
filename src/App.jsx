import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import YourResumes from "./components/YourResumes"; // placeholder component added
import Contact from "./components/contact"; // Import Contact component (folder name is lowercase)
import ProtectedRoute from "./components/ProtectedRoute"; // Ensure this is correctly implemented
import Navbar from "./components/Navbar"; // Import Navbar
import "./App.css";

const App = () => {
  return (
    <div>
      <Navbar /> {/* Include Navbar in the layout */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/your-resumes"
          element={
            <ProtectedRoute>
              <YourResumes />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
