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
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Student Management</h1>
      
      {/* Add/Edit Student Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="border p-2"
        />
        <input
          type="number"
          placeholder="Age"
          value={form.age}
          onChange={(e) => setForm({ ...form, age: e.target.value })}
          required
          className="border p-2"
        />
        <input
          type="text"
          placeholder="Course"
          value={form.course}
          onChange={(e) => setForm({ ...form, course: e.target.value })}
          required
          className="border p-2"
        />
        <button type="submit" className="bg-green-500 text-white p-2">
          {editingId ? "Update" : "Add"} Student
        </button>
      </form>

      {/* Student List */}
      <table className="mt-6 border-collapse border w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Age</th>
            <th className="border p-2">Course</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id} className="text-center">
              <td className="border p-2">{student.name}</td>
              <td className="border p-2">{student.age}</td>
              <td className="border p-2">{student.course}</td>
              <td className="border p-2">
                <button onClick={() => handleEdit(student)} className="bg-yellow-500 text-white px-3 py-1 mr-2">Edit</button>
                <button onClick={() => handleDelete(student._id)} className="bg-red-500 text-white px-3 py-1">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentDashboard;
