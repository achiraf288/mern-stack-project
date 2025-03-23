import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  course: { type: String, required: true },
  status: { type: String, default: "Active" }
});

const Student = mongoose.model("Student", StudentSchema);
export default Student;
