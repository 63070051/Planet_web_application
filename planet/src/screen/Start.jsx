import React from "react";
import Logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
function Start(props) {
  return (
    <div style={{ backgroundColor: "#FBF7F0" }} className="min-h-screen">
      <div className="max-w-5xl py-2 flex justify-between mx-auto">
        <div className="flex items-center space-x-4">
          <img className="w-10" src={Logo} alt="" />
          <p>Planet</p>
        </div>
        <div className="space-x-4">
          <Link to="/Login">Login</Link>
          <Link to="/Signup">SignUp</Link>
        </div>
      </div>
    </div>
  );
}

export default Start;
