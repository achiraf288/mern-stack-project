import { useEffect, useState } from "react";
import axios from "../services/api";
import StudentList from "./StudentList";
import StudentForm from "./StudentForm";

const Dashboard = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await axios.get("/students");
    setStudents(res.data);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <StudentForm fetchStudents={fetchStudents} />
      <StudentList students={students} fetchStudents={fetchStudents} />
    </div>
  );
};

export default Dashboard;
