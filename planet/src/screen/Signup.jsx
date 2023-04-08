import React from "react";
import Logo from "../assets/logo.svg";
import Background from "../assets/background_logo.svg";
import { Link } from "react-router-dom";
function Signup(props) {
  return (
    <div style={{ backgroundColor: "#FBF7F0" }} className="flex justify-between">
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
                  // placeholder="Username"
                />
              </div>
              <div>
                <label
                  className="block text-gray-400 text-sm mb-2"
                  htmlFor="username"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  // placeholder="Username"
                />
              </div>
              <div>
                <label
                  className="block text-gray-400 text-sm mb-2"
                  htmlFor="username"
                >
                  Phone number
                </label>
                <input
                  className="shadow appearance-none border rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  // placeholder="Username"
                />
              </div>
              <div>
                <label
                  className="block text-gray-400 text-sm mb-2"
                  htmlFor="username"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  // placeholder="Username"
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
                  id="password"
                  type="password"
                  // placeholder="Username"
                />
              </div>
              <div className="space-y-4">
                <button
                  style={{ backgroundColor: "#F08D6E" }}
                  className="text-sm px-4 py-1 w-full rounded-sm mt-3"
                >
                  LOGIN
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
