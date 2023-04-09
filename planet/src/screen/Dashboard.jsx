import React from "react";
import Logo from "../assets/logo.svg";
import DashBoard from "../assets/dashboard.svg";
import Account from "../assets/account.svg";
import Notes from "../assets/notes.svg";
import Setting from "../assets/setting.svg";
import Todo from "../assets/todo.svg";

function Dashboard(props) {
  return (
    <div style={{ backgroundColor: "#FBF7F0" }} className="flex">
      <div className="container">
        <div className="justify-between">
          <div className="Top">
            <div className="TopL">
              <p style={{fontWeight: "bold",fontFamily : "jetbrains_valiable"}} className="text-4xl">Welcome Back, "jeng" </p>
              <p style={{fontWeight: "semibold", fontFamily : "jetbrains_valiable" }} className="text-2xl">What's Up Today</p>
            </div>
            <div className="TopL">
            <img className="w-24 mb-6" src={Logo} alt="" srcSet="" />
            
            </div>
          </div>
        </div>
        <div className="Down">
          <div  className="flex justify-between">
            <div></div> 
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}



export default Dashboard;


