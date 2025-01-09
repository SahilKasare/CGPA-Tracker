import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../supabaseClient";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    const { error } = await supabase
      .from("students")
      .insert({ email, password });

    if (error) {
      console.error("Error signing up:", error.message);
      alert(`Failed to sign up: ${error.message}`);
    } else {
      navigate("/home");
    }
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white shadow-lg p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Sign Up</h1>
        <div className="mb-4">
          <label className="block mb-2">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>
        <button
          onClick={handleSignUp}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Sign Up
        </button>
        <div className="text-center mt-4">
          <button onClick={() => navigate("/")} className="text-blue-500">
            Already have an account? Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

