import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">Student Management System</h1>
      <div className="space-x-4">
        <Link to="/" className="px-3 py-2 bg-gray-700 rounded">Home</Link>
        <Link to="/admin" className="px-3 py-2 bg-gray-700 rounded">Admin</Link>
        <Link to="/student-dashboard" className="px-3 py-2 bg-green-500 rounded">Student Dashboard</Link>
      </div>
    </nav>
  );
};

export default Navbar;
