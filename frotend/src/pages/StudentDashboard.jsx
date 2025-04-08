import { useEffect, useState } from "react";
import axios from "axios";

const StudentDashboard = () => {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", age: "", course: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await axios.get("http://localhost:5000/api/students");
    setStudents(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`http://localhost:5000/api/students/${editingId}`, form);
      setEditingId(null);
    } else {
      await axios.post("http://localhost:5000/api/students", form);
    }
    setForm({ name: "", age: "", course: "" });
    fetchStudents();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/students/${id}`);
    fetchStudents();
  };

  const handleEdit = (student) => {
    setEditingId(student._id);
    setForm({ name: student.name, age: student.age, course: student.course });
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Student Management</h1>
      
      {/* Add/Edit Student Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border p-3 rounded-md"
          required
        />
        <input
          type="number"
          placeholder="Age"
          value={form.age}
          onChange={(e) => setForm({ ...form, age: e.target.value })}
          className="w-full border p-3 rounded-md"
          required
        />
        <input
          type="text"
          placeholder="Course"
          value={form.course}
          onChange={(e) => setForm({ ...form, course: e.target.value })}
          className="w-full border p-3 rounded-md"
          required
        />
        <button type="submit" className="w-full bg-green-500 text-white py-3 rounded-md">
          {editingId ? "Update" : "Add"} Student
        </button>
      </form>

      {/* Student List */}
      <table className="min-w-full table-auto bg-white border rounded-md shadow-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Age</th>
            <th className="px-4 py-2 border">Course</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td className="px-4 py-2 border">{student.name}</td>
              <td className="px-4 py-2 border">{student.age}</td>
              <td className="px-4 py-2 border">{student.course}</td>
              <td className="px-4 py-2 border">
                <button onClick={() => handleEdit(student)} className="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2">Edit</button>
                <button onClick={() => handleDelete(student._id)} className="bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentDashboard;
