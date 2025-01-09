
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import supabase from '../../supabaseClient'; // Import supabase client

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = location.state || {};
  const [cgpa, setCgpa] = useState(null); // State to store CGPA

  // Ensure userId is defined
  if (!userId) {
    console.error('User ID is not defined');
    return <div>Error: User ID is not defined</div>;
  }

  console.log('UserId in Home:', userId); // Debugging userId

  const handleGetGrades = () => {
    navigate('/getGrades', { state: { userId } });
  };

  const handleAddGrades = () => {
    navigate('/addGrades', { state: { userId } });
  };

  const handleCalculateCGPA = async () => {
    const { data, error } = await supabase
      .from('subjects')
      .select('credits, grade')
      .eq('student_id', userId);

    if (error) {
      console.error('Error fetching subjects:', error.message);
      return;
    }

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

    data.forEach(subject => {
      const { credits, grade } = subject;
      totalCredits += credits;
      weightedSum += (gradeToPoints[grade] * credits);
    });

    const calculatedCgpa = (weightedSum / totalCredits).toFixed(2);
    setCgpa(calculatedCgpa); // Set the CGPA state
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen flex items-center justify-center">
      <button
          onClick={() => navigate("/")}
          className="absolute top-0 right-0 m-4 bg-black text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      <div className="max-w-md w-full bg-white shadow-lg p-6 rounded-lg relative">
        <h1 className="text-3xl font-bold mb-6 text-center">Home</h1>
        <div className='flex justify-around'>
          <button
            onClick={handleGetGrades}
            className="bg-blue-500 text-white px-4 py-2 rounded min-w-40 mb-4"
          >
            Display Grades
          </button>
          <button
            onClick={handleAddGrades}
            className="bg-green-500 text-white px-4 py-2 rounded min-w-40 mb-4"
          >
            Add Grades
          </button>
        </div>
        <button
          onClick={handleCalculateCGPA}
          className="bg-purple-500 text-white px-4 py-2 rounded w-full"
        >
          Calculate CGPA
        </button>
        {cgpa !== null && (
          <div className="mt-4 p-4 bg-gray-200 rounded-lg text-center">
            <h2 className="text-xl font-bold">Your CGPA</h2>
            <p className="text-2xl">{cgpa}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;