<<<<<<< HEAD
import { useState } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Dashboard from './screen/Dashboard'
import Login from './screen/Login'
import Signup from './screen/Signup'
import Start from './screen/Start'
import Todo from './screen/Todo'
import Forgot from './screen/Forgot'
import Allnotes from './screen/Allnotes'
import Profile from './screen/Profile'
import Task from './screen/Task'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/Dashboard' element={<Dashboard />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/Todo' element={<Todo />} />
        <Route path='/Allnotes' element={<Allnotes />} />
        <Route path='/Profile' element={<Profile />} />
        <Route path='/Task' element={<Task />} />
      </Routes>
=======
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./screen/Dashboard";
import Login from "./screen/Login";
import Signup from "./screen/Signup";
import Start from "./screen/Start";
import Todo from "./screen/Todo";
import Forgot from "./screen/Forgot";
import Allnotes from "./screen/Allnotes";
import Profile from "./screen/Profile";
import Note from "./screen/Note";
import { RequireAuth } from "./auth/requireAuth";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route
            path="/Dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route
            path="/Todo"
            element={
              <RequireAuth>
                <Todo />
              </RequireAuth>
            }
          />
          <Route
            path="/Allnotes"
            element={
              <RequireAuth>
                <Allnotes />
              </RequireAuth>
            }
          />
          <Route
            path="/Profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route
            path="/Note"
            element={
              <RequireAuth>
                <Note />
              </RequireAuth>
            }
          />
        </Routes>
>>>>>>> origin/main
    </BrowserRouter>
  );
}

export default App;
