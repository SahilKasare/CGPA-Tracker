
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import supabase from "../../supabaseClient";

const AddGrades = () => {
  const [subjectName, setSubjectName] = useState("");
  const [credits, setCredits] = useState("");
  const [grade, setGrade] = useState("");
  const [semester, setSemester] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { userId } = location.state || {};

  const handleAddGrade = async () => {
    const { error } = await supabase.from("subjects").insert({
      student_id: userId,
      name: subjectName,
      credits: parseInt(credits),
      grade,
      semester: parseInt(semester),
    });

    if (error) {
      console.error("Error adding grade:", error.message);
      alert(`Failed to add grade: ${error.message}`);
    } else {
      alert("Grade added successfully!");
    }
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white shadow-lg p-6 rounded-lg">
      <button
          onClick={() => navigate("/home", { state: { userId } })}
          className="absolute top-0 left-0 m-4 bg-black text-white px-4 py-2 rounded"
        >
          Home
        </button>
        <button
          onClick={() => navigate("/")}
          className="absolute top-0 right-0 m-4 bg-black text-white px-4 py-2 rounded"
        >
          Logout
        </button>
        <h1 className="text-3xl font-bold mb-6 text-center">Add Grades</h1>
        <div className="mb-4">
          <label className="block mb-2">Select Semester:</label>
          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="border rounded p-2 w-full"
          >
            <option value="">Select Semester</option>
            {[...Array(8).keys()].map((i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Subject Name:</label>
          <input
            type="text"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Credits:</label>
          <select
            value={credits}
            onChange={(e) => setCredits(e.target.value)}
            className="border rounded p-2 w-full"
          >
            <option value="">Select Credits</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Grade:</label>
          <select
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="border rounded p-2 w-full"
          >
            <option value="">Select Grade</option>
            <option value="O">O</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="P">P</option>
            <option value="F">F</option>
          </select>
        </div>
        <button
          onClick={handleAddGrade}
          className="bg-green-500 text-white px-4 py-2 rounded w-full mb-4"
        >
          Add Grade
        </button>
        <button
          onClick={() => navigate("/getGrades", { state: { userId } })}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full mb-4"
        >
          Display Grades
        </button>
        
      </div>
    </div>
  );
};

export default AddGrades;