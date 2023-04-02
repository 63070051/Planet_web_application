import React from "react";
import Logo from "../assets/logo.svg";
import Logo_Home from "../assets/logo_home.svg";
import Bg_left from "../assets/start-bg-left.png"
import Bg_right from "../assets/start_bg_right.svg"
import "../fonts/Jockey_One/JockeyOne-Regular.ttf"
import "../fonts/Kumbh_Sans/static/KumbhSans-Regular.ttf"
import "../fonts/JetBrains_Mono/JetBrainsMono-VariableFont_wght.ttf"
import { Link } from "react-router-dom";

function Body() {
  return (
    <div className="m-auto z-50">
      <img style={{width : "35rem"}} src={Logo_Home} alt="" />
      <div className="flex justify-center">
        <Link
          to="/Home"
          style={{ backgroundColor: "#F08D6E", fontFamily : "Kumbh_Sans_Regular" }}
          className="px-4 py-2 rounded text-white underline underline-offset-4 mt-28 hover:scale-125 duration-500"
        >
          Get started
        </Link>
      </div>
      <div style={{fontFamily : "jetbrains_valiable"}} className="text-gray-500 text-center mt-20">
        <p>I never dreamed about success.</p>
        <p>I worked for it.</p>
      </div>
    </div>
  );
}

function Navbar() {
  return (
    <div className="max-w-xl sm:mx-w-2xl md:max-w-3xl lg:max-w-5xl py-4 flex justify-between mx-auto text-lg">
      <div className="flex items-center space-x-4">
        <img className="w-10" src={Logo} alt="" />
        <p className="text-xl" style={{fontFamily : "jockey"}}>Planet</p>
      </div>
      <div style={{fontFamily : "jetbrains_valiable"}} className="space-x-4 flex items-center text-gray-600">
        <Link to="/Login">Login</Link>
        <Link to="/Signup" className="px-4 py-1 rounded-full border border-gray-600 hover:text-white hover:border-blue-300 hover:bg-blue-300 duration-500">SignUp</Link>
      </div>
    </div>
  );
}

function Start(props) {
  return (
    <div
      style={{ backgroundColor: "#FBF7F0" }}
      className="px-4 sm:px-0 h-screen relative overflow-hidden"
      >
      <img className="hidden md:block absolute w-48 bottom-3 left-0 bg-cover" src={Bg_left} alt=""/>
      <img className="hidden md:block absolute w-48 bottom-3 right-0 bg-cover" src={Bg_right} alt=""/>
      <Navbar />
      <div className="flex h-full">
        <Body />
      </div>
    </div>
  );
}

export default Start;
