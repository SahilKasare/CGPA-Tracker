import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../supabaseClient";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async () => {
    const { data, error } = await supabase
      .from("students")
      .select("*")
      .eq("email", email)
      .eq("password", password)
      .single();

    if (error || !data) {
      console.error(
        "Error signing in:",
        error ? error.message : "Invalid credentials"
      );
      alert("Failed to sign in. Please check your email and password.");
    } else {
      navigate("/home", { state: { userId: data.id } });
    }
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white shadow-lg p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Sign In</h1>
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
          onClick={handleSignIn}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Sign In
        </button>
        <div className="text-center mt-4">
          <button onClick={() => navigate("/signup")} className="text-blue-500">
            Don't have an account? Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

