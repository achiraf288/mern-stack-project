import { useState } from "react";
import axios from "../services/api";

const StudentForm = ({ fetchStudents }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/students", { name, age, status: "Active" });
    fetchStudents();
    setName("");
    setAge("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input type="text" placeholder="Student Name" value={name}
        onChange={(e) => setName(e.target.value)} className="border p-2 mr-2"/>
      <input type="number" placeholder="Age" value={age}
        onChange={(e) => setAge(e.target.value)} className="border p-2 mr-2"/>
      <button type="submit" className="bg-green-600 text-white px-4 py-2">Add</button>
    </form>
  );
};

export default StudentForm;
