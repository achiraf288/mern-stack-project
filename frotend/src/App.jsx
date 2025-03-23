import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Router>
      {user && <Navbar setUser={setUser} />}
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route path="/" element={user ? (user.role === "admin" ? <Navigate to="/admin" /> : <Home />) : <Navigate to="/login" />} />
        <Route path="/admin" element={user && user.role === "admin" ? <Admin /> : <Navigate to="/login" />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} /> {/* Added Route */}
      </Routes>
    </Router>
  );
};

export default App;
