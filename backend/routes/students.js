import express from "express";
import Student from "../models/Student.js"; // Ensure correct import path

const router = express.Router();

// Add a new student
router.post("/", async (req, res) => {
  console.log("POST /api/students hit"); // Debugging
  try {
    const { name, age, course, status } = req.body;
    const student = new Student({ name, age, course, status });
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error });
  }
});

// Update student details
router.put("/:id", async (req, res) => {
  try {
    const { name, age, course, status } = req.body;
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { name, age, course, status },
      { new: true }
    );
    res.json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: "Error updating student", error });
  }
});

// Delete a student
router.delete("/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting student", error });
  }
});

export default router;
