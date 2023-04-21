import React, { useState, useEffect } from "react";
import Logo from "../assets/logo.svg";
import Background from "../assets/background_logo.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import path from "../../path";
import md5 from "md5";
function Signup(props) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [password_c, setPassword_C] = useState("");

  function AddUser() {
    let [firstname, lastname] = fullName.split(" "); 
    if (password == password_c) {
      axios
        .post(`${path}/register`, {
          firstname: firstname,
          lastname: lastname,
          email: email,
          phone: phone,
          password: md5(password),
        })
        .then((res) => {
          if(res.data == "successfully"){
            window.location.replace("/login");
          }
          console.log(res.data)
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  return (
    <div
      style={{ backgroundColor: "#FBF7F0" }}
      className="flex justify-between"
    >
      <div className="w-full sm:w-2/3 flex justify-center items-center relative min-h-screen">
        <div>
          <div className="flex">
            <img className="w-20 mb-3" src={Logo} alt="" srcSet="" />
          </div>
          <div className="space-y-8 w-72">
            <p className="text-3xl font-bold">Sign Up</p>
            <div className="space-y-3">
              <div>
                <label
                  className="block text-gray-400 text-sm mb-2"
                  htmlFor="username"
                >
                  Full name
                </label>
                <input
                  className="shadow appearance-none border rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  onChange={(e) => {
                    setFullName(e.target.value);
                  }}
                />
              </div>
              <div>
                <label
                  className="block text-gray-400 text-sm mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="text"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div>
                <label
                  className="block text-gray-400 text-sm mb-2"
                  htmlFor="phone"
                >
                  Phone number
                </label>
                <input
                  className="shadow appearance-none border rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="phone"
                  type="text"
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </div>
              <div>
                <label
                  className="block text-gray-400 text-sm mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div>
                <label
                  className="block text-gray-400 text-sm mb-2"
                  htmlFor="password1"
                >
                  Confirm Password
                </label>
                <input
                  className="shadow appearance-none border rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password1"
                  type="password"
                  onChange={(e) => {
                    setPassword_C(e.target.value);
                  }}
                />
              </div>
              <div className="space-y-4">
                <button
                  onClick={() => {
                    AddUser();
                  }}
                  style={{ backgroundColor: "#F08D6E" }}
                  className="text-sm px-4 py-1 w-full rounded-sm mt-3"
                >
                  Sign Up
                </button>
                <div className="flex justify-center items-center">
                  <Link className="text-gray-400 text-sm text-center duration-500 hover:text-red-600">
                    Forgot your password ?
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <p className="text-sm mt-12 text-center">
            Already have any account?{" "}
            <Link to="/Login" style={{ color: "#E5725D" }}>
              SIGN IN
            </Link>
          </p>
        </div>
      </div>
      <div
        className="w-1/3 min-h-screen hidden sm:block"
        style={{
          backgroundImage: `url(${Background})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></div>
    </div>
  );
}

export default Signup;
