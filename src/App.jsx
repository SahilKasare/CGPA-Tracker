

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Home from './components/Home';
import GetGrades from './components/GetGrades';
import AddGrades from './components/AddGrades';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<Home />} />
      <Route path="/getGrades" element={<GetGrades />} />
      <Route path="/addGrades" element={<AddGrades />} />
    </Routes>
  );
};

export default App;