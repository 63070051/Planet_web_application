import React from "react";
import Logo from "../assets/logo.svg";
import Background from "../assets/background_logo.svg";
import { Link } from "react-router-dom";
function Login(props) {
  return (
    <div style={{ backgroundColor: "#FBF7F0" }} className="flex">
      <div className="w-full sm:w-1/2 flex justify-center items-center relative min-h-screen">
        <div>
          <div className="flex justify-center">
            <img className="w-24 mb-6" src={Logo} alt="" srcSet="" />
          </div>
          <div className="space-y-12 w-72">
            <p className="text-3xl font-bold text-center">Log in to Planet</p>
            <div className="space-y-6">
              <div>
                <label
                  className="block text-gray-400 text-sm mb-2"
                  htmlFor="username"
                >
                  Username or Email
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
                  Password
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
                  className="text-sm px-4 py-1 w-full rounded-sm"
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
          <p className="text-sm mt-24 text-center">
            Don’t have an account?{" "}
            <Link to="/Signup" style={{ color: "#E5725D" }}>
              SIGN UP
            </Link>
          </p>
        </div>
      </div>
      <div
        className="w-1/2 min-h-screen hidden sm:block"
        style={{
          backgroundImage: `url(${Background})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></div>
    </div>
  );
}

export default Login;
