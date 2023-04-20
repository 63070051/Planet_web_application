import React, { useState } from "react";
import Logo from "../assets/logo.svg";
import Background from "../assets/background_logo.svg";
import { Link } from "react-router-dom";
import path from "../../path";
import axios from "axios";
import md5 from "md5";
function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function SignIn() {
    axios
      .post(`${path}/login-user`, {email : email, password : md5(password)})
      .then((res) => {
        if(res.data.Items.length == 0){
          alert("Email or Password is invalid")
        }
        else{
          localStorage.setItem("id", res.data.Items[0].id)
          window.location.replace("Dashboard");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div
      style={{ backgroundColor: "#FBF7F0" }}
      className="flex justify-between"
    >
      <div className="w-full sm:w-2/3 flex justify-center items-center relative min-h-screen">
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
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="text"
                  placeholder="Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
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
                  placeholder="************"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="space-y-4">
                <button
                  onClick={() => {
                    SignIn();
                  }}
                  style={{ backgroundColor: "#F08D6E" }}
                  className="text-sm px-4 py-1 w-full rounded-sm"
                >
                  LOGIN
                </button>
                <div className="flex justify-center items-center">
                  <Link to="/Forgot" className="text-gray-400 text-sm text-center duration-500 hover:text-red-600">
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

export default Login;
