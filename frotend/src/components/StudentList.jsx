import axios from "../services/api";

const StudentList = ({ students, fetchStudents }) => {
  const handleDelete = async (id) => {
    await axios.delete(`/students/${id}`);
    fetchStudents();
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-2">Student List</h3>
      <ul>
        {students.map((student) => (
          <li key={student.id} className="border p-2 flex justify-between">
            <span>{student.name} ({student.age} years old)</span>
            <button onClick={() => handleDelete(student.id)}
              className="bg-red-600 text-white px-2 py-1">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
