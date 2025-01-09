
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import supabase from "../../supabaseClient";

const GetGrades = () => {
  const [semester, setSemester] = useState("");
  const [grades, setGrades] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { userId } = location.state || {};

  useEffect(() => {
    if (semester) {
      fetchGrades();
    }
  }, [semester]);

  const fetchGrades = async () => {
    const { data, error } = await supabase
      .from("subjects")
      .select("id, name, credits, grade")
      .eq("student_id", userId)
      .eq("semester", parseInt(semester))
      .order("credits", { ascending: true })
      .order("grade", { ascending: true });

    if (error) {
      console.error("Error fetching grades:", error.message);
    } else {
      setGrades(data);
    }
  };

  const calculateSGPA = () => {
    const gradeToPoints = {
      O: 10,
      A: 9,
      B: 8,
      C: 7,
      D: 6,
      P: 5,
      F: 0,
    };

    let totalCredits = 0;
    let weightedSum = 0;

    grades.forEach((subject) => {
      const { credits, grade } = subject;
      totalCredits += credits;
      weightedSum += gradeToPoints[grade] * credits;
    });

    const sgpa = (weightedSum / totalCredits).toFixed(2);
    alert(`Your SGPA is: ${sgpa}`);
  };

  const deleteGrade = async (subjectId) => {
    const { error } = await supabase
      .from("subjects")
      .delete()
      .eq("id", subjectId);

    if (error) {
      console.error("Error deleting grade:", error.message);
    } else {
      // Refresh the grades list after deletion
      fetchGrades();
    }
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen flex items-center justify-center">
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
      <div className="relative max-w-md w-full bg-white shadow-lg p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Display Grades</h1>
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
        <button
          onClick={calculateSGPA}
          className="bg-yellow-500 text-white px-4 py-2 rounded w-full mb-4"
        >
          Calculate SGPA
        </button>
        <button
          onClick={() => navigate("/addGrades", { state: { userId } })}
          className="bg-green-500 text-white px-4 py-2 rounded w-full"
        >
          Add Grades
        </button>
        <div className="mt-4">
          {grades.length > 0 ? (
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2">Subject Name</th>
                  <th className="py-2">Credits</th>
                  <th className="py-2">Grade</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {grades.map((grade, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{grade.name}</td>
                    <td className="border px-4 py-2">{grade.credits}</td>
                    <td className="border px-4 py-2">{grade.grade}</td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => deleteGrade(grade.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center">
              No grades found for the selected semester.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GetGrades;