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
import Task from "./screen/Task";
import Project_task from "./screen/Project_task";
import AddNote from "./screen/AddNote";
import { RequireAuth } from "./auth/requireAuth";
import { RequireNotAuth } from "./auth/requireNotAuth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RequireNotAuth><Start /></RequireNotAuth>} />
        <Route
          path="/Dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/Login"
          element={
            <RequireNotAuth>
              <Login />
            </RequireNotAuth>
          }
        />
        <Route
          path="/Signup"
          element={
            <RequireNotAuth>
              <Signup />
            </RequireNotAuth>
          }
        />
        <Route
          path="/Forgot"
          element={
            <RequireNotAuth>
              <Forgot />
            </RequireNotAuth>
          }
        />
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
        <Route
          path="/Task"
          element={
            <RequireAuth>
              <Task />
            </RequireAuth>
          }
        />
        <Route
          path="/Project_task"
          element={
            <RequireAuth>
              <Project_task />
            </RequireAuth>
          }
        />
        <Route
          path="/AddNote"
          element={
            <RequireAuth>
              <AddNote />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
