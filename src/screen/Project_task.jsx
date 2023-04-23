import React, { useState } from "react";
import "../fonts/Jockey_One/JockeyOne-Regular.ttf";
import "../fonts/Kumbh_Sans/static/KumbhSans-Regular.ttf";
import "../fonts/JetBrains_Mono/JetBrainsMono-VariableFont_wght.ttf";
import Plus from "../assets/plus.svg";
import Minus from "../assets/minus.svg";
import NavigationBar from "../component/NavigationBar";
import Notification from "../assets/notification.svg";
import Profile from "../assets/profile.svg";

const DATACHECKBOX = [
  "Send email to meaw.",
  "Clean the room.",
  "Order new dress.",
  "manager",
  "manager",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
];
const Progress = [
    "Send email to meaw.",
    "Clean the room.",
    "Order new dress.",
    "progress",
    "manager",
    "Call manager.",
    "Call manager.",
    "Call manager.",
    "Call manager.",
    "Call manager.",
    "Call manager.",
    "Call manager.",
    "Call manager.",
    "Call manager.",
    "Call manager.",
    "Call manager.",
    "Call manager.",
    "Call manager.",
    "Call manager.",
    "Call manager.",
    "Call manager.",
    "Call manager.",
    "Call manager.",
    "Call manager.",
    "Call manager.",
    "Call manager.",
    "Call manager.",
    "Call manager.",
    "Call manager.",
    "Call manager.",
    "Call manager.",
    "Call manager.",
    "Call manager.",
    "Call manager.",
    "Call manager.",
    "Call manager.",
    "Call manager.",
    "Call manager.",
    "Call manager.",
    "Call manager.",
    "Call manager.",
    "Call manager.",
  ];
function CheckBox(props) {
  const [index, setIndex] = useState(props.index);
  const [checked, setChecked] = useState(false);
  return (
    <div className="border-t flex justify-between items-center px-6 py-3">
      <div
        className="flex space-x-4 items-center"
        onClick={() => {
          setChecked(!checked);
        }}
      >
        
        <input
          type="checkbox"
          checked={checked}
          onChange={() =>{}}
          className="w-4 h-4 border-gray-300 rounded accent-[#FFAA9B]"
        />
        <p style={{ fontFamily: "jura" }}>{props.text}</p>
      </div>
      <img src={Minus} alt="" />
    </div>
  );
}
function Project_task() {
  return (
    <div className="select-none">
      {/* // Body Grid */}
      <div
        className="grid grid-cols-4 lg:grid-cols-5 min-h-screen pb-20 sm:pb-0"
        style={{ backgroundColor: "#EFEADE" }}
      >
        {/* // Navigation Bar */}
        <NavigationBar />
        {/* // Todo Body */}
        <div className="col-span-4 px-4 mx-10 h-full">
          <div className="flex justify-between items-center h-[15%]">
            <div>
              <p className="text-2xl" style={{ fontFamily: "jockey" }}>
                Welcome back, Kwanpf
              </p>
              <p
                className="text-xl"
                style={{ fontFamily: "Kumbh_Sans_Regular" }}
              >
                What’s Up Today?
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <img className="w-10" src={Notification} alt="" />
              <img className="w-10" src={Profile} alt="" />
            </div>
          </div>
          <div className="h-[35%] sm:h-[80%] rounded-2xl relative pt-8 px-8 pb-6" style={{backgroundColor: "#FBF7F0"}}>
            <p className="font-jockey text-2xl">My Task</p>
          <div
            className="grid grid-cols-1 sm:grid-cols-3 gap-0 sm:gap-4 mt-10 relative"
            style={{ backgroundColor: "#FBF7F0" }}
          >
            
            {/* Todo */}
            <div className="col-span-1">
              <div
                className="w-full border rounded-2xl h-full"
                style={{ backgroundColor: "#FBF7F0" }}
              >
                <div className="text-xl flex justify-between items-center px-6 py-2">
                  <p className="font-jockey text-md py-1">To do</p>
                  <img className="w-6" src={Plus} alt="" />
                </div>
                <div className="overflow-y-auto h-[150px] sm:h-[480px]">
                  {DATACHECKBOX.map((value, index) => {
                    return <CheckBox text={value} key={index} index={index} />;
                  })}
                </div>
              </div>
            </div>
            {/* In Progress */}
            <div className="col-span-1">
              <div
                className="w-full border rounded-2xl h-full"
                style={{ backgroundColor: "#FBF7F0" }}
              >
                <div className="text-xl flex justify-between items-center px-6 py-2">
                  <p className="font-jockey text-md py-1">In Progress</p>
                  <img className="w-6" src={Plus} alt="" />
                </div>
                <div className="overflow-y-auto h-[150px] sm:h-[480px]">
                  {Progress.map((value, index) => {
                    return <CheckBox text={value} key={index} index={index} />;
                  })}
                </div>
              </div>
            </div>
            {/* Done */}
            <div className="col-span-1">
              <div
                className="w-full border rounded-2xl h-full"
                style={{ backgroundColor: "#FBF7F0" }}
              >
                <div className="text-xl flex justify-between items-center px-6 py-2">
                  <p className="font-jockey text-md py-1">Done</p>
                  <img className="w-6" src={Plus} alt="" />
                </div>
                <div className="overflow-y-auto h-[150px] sm:h-[480px]">
                  {DATACHECKBOX.map((value, index) => {
                    return <CheckBox text={value} key={index} index={index} />;
                  })}
                </div>
              </div>
            </div>
          </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Project_task;