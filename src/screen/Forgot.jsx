import React from "react";
import Logo from "../assets/logo.svg";
import Background from "../assets/background_logo.svg";
import { Link } from "react-router-dom";
export default function Forgot() {
  return (
    <div style={{ backgroundColor: "#FBF7F0" }} className="flex justify-between">
      <div className="w-full sm:w-2/3 flex justify-center items-center relative min-h-screen">
        <div>
          <div className="flex justify-center">
            <img className="w-24 mb-6" src={Logo} alt="" srcSet="" />
          </div>
          <div className="space-y-12 w-72">
            <p className="text-3xl font-bold text-center">Reset Password</p>
            <div className="space-y-6">
            <div>
                <label
                  className="block text-gray-400 text-sm mb-2"
                  htmlFor="email"
                >
                  Enter Email
                </label>
                <input
                  className="shadow appearance-none border rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="text"
                />
              </div>
              <div>
                <label
                  className="block text-gray-400 text-sm mb-2"
                  htmlFor="username"
                >
                  Enter new Password
                </label>
                <input
                  className="shadow appearance-none border rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="passoword"
                  type="password"
                />
              </div>
              <div>
                <label
                  className="block text-gray-400 text-sm mb-2"
                  htmlFor="password"
                >
                  Confirm Password
                </label>
                <input
                  className="shadow appearance-none border rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="cpassword"
                  type="password"
                />
              </div>
              <div className="space-y-4">
                <button
                  style={{ backgroundColor: "#F08D6E" }}
                  className="text-sm px-4 py-1 w-full rounded-sm"
                >
                  RESET
                </button>
                
              </div>
            </div>
          </div>
          <p className="text-sm mt-24 text-center">
            Change your mind?{" "}
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
  )
}
