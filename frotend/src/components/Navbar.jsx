import { Link } from "react-router-dom";

const Navbar = ({ setUser }) => {
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">Student Management System</h1>
      <div className="space-x-6">
        <Link to="/" className="px-4 py-2 hover:bg-blue-500 rounded">Home</Link>
        <Link to="/admin" className="px-4 py-2 hover:bg-blue-500 rounded">Admin</Link>
        <Link to="/student-dashboard" className="px-4 py-2 hover:bg-blue-500 rounded">Student Dashboard</Link>
        <button onClick={handleLogout} className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
