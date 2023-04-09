import React, { useState, useContext } from "react";
import Hamberger from "../component/Hamburger";
import DonutChart from "../component/DonutChart";
import "../fonts/Jockey_One/JockeyOne-Regular.ttf";
import "../fonts/Kumbh_Sans/static/KumbhSans-Regular.ttf";
import "../fonts/JetBrains_Mono/JetBrainsMono-VariableFont_wght.ttf";
import RightBackground from "../assets/TodoRightBackground.png";
import Logo from "../assets/logo.svg";
import Plus from "../assets/plus.svg";
import Minus from "../assets/minus.svg";
import NavigationBar from "../component/NavigationBar";
import Notification from "../assets/notification.svg";
import Profile from "../assets/profile.svg";
import H_bg from "../assets/hamburger_bg.png";

import moment from "moment";



const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

const DAY = [
  {
    daynum: "1",
  },
  {
    daynum: "2",
  },
  {
    daynum: "3",
  },
  {
    daynum: "4",
  },
  {
    daynum: "5",
  },
  {
    daynum: "6",
  },
  {
    daynum: "7",
  },
  {
    daynum: "8",
  },
  {
    daynum: "9",
  },
  {
    daynum: "10",
  },
  {
    daynum: "11",
  },
  {
    daynum: "12",
  },
  {
    daynum: "13",
  },
  {
    daynum: "14",
  },
  {
    daynum: "15",
  },
  {
    daynum: "16",
  },
  {
    daynum: "17",
  },
  {
    daynum: "18",
  },

  {
    daynum: "19",
  },
  {
    daynum: "20",
  },
  {
    daynum: "21",
  },
  {
    daynum: "22",
  },
  {
    daynum: "23",
  },
  {
    daynum: "24",
  },
  {
    daynum: "25",
  },
  {
    daynum: "26",
  },
  {
    daynum: "27",
  },
  {
    daynum: "28",
  },
  {
    daynum: "29",
  },
  {
    daynum: "30",
  },
  {
    daynum: "31",
  },
];

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



function CheckBox(props) {
  const [index, setIndex] = useState(props.index);
  return (
    <div className="border-t flex justify-between items-center px-6 py-3">
      <div className="flex space-x-4 items-center">
        <input type="checkbox" className="w-4 h-4 border-gray-300 rounded accent-[#FFAA9B]"/>
        <p style={{ fontFamily: "jura" }}>{props.text}</p>
      </div>
      <img src={Minus} alt="" />
    </div>
  );
}

function TodoList() {
  const [focus, setFocus] = useState(new Date().getDate());

  function DayComponent(props) {
    return (
      <div
        className="rounded-full border py-2 w-10 my-2 cursor-pointer"
        style={{ borderColor: props.bg, backgroundColor: props.bg , fontFamily : "jura"}}
        onClick={() => {
          setFocus(props.day);
        }}
      >
        <p className="text-center text-xl" style={{ color: props.color }}>
          {props.day}
        </p>
        <p className="text-xs text-center" style={{ color: props.color }}>
          {props.days}
        </p>
      </div>
    );
  }

  return (
    <div className="select-none">
      {/* // Body Grid */}
      <div
        className="grid grid-cols-5 gap-4 min-h-screen pr-6"
        style={{ backgroundColor: "#EFEADE" }}
      >
        {/* // Navigation Bar */}
        <NavigationBar/>
        {/* // Todo Body */}
        <div className="col-span-3 px-2 pt-6">
          <div className="flex justify-between items-center">
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
          <div
            className="mt-6 rounded-xl pt-8 px-8 pb-6 h-[85.5vh]"
            style={{ backgroundColor: "#FBF7F0" }}
          >
            <p className="text-2xl" style={{ fontFamily: "jockey" }}>
              TO DO LIST
            </p>
            <div className="relative flex items-center">
              <div className="grid grid-flow-col auto-cols-max gap-2 overflow-x-scroll">
                {DAY.map((value, index) => {
                  return index + 1 == focus ? (
                    <DayComponent
                      day={value.daynum}
                      days={DAYS[(parseInt(value.daynum) - 1) % 7]}
                      color={"white"}
                      bg={"#FFAA9B"}
                      key={index}
                    />
                  ) : (
                    <DayComponent
                      day={value.daynum}
                      days={DAYS[(parseInt(value.daynum) - 1) % 7]}
                      color={"#B5B7B9"}
                      bg={"FBF7F0"}
                      key={index}
                    />
                  );
                })}
              </div>
            </div>
            <div
              className="w-full mt-10 border rounded-lg"
              style={{ borderColor: "#D9DADA" }}
            >
              <div className="text-xl flex justify-between items-center px-6 py-2">
                <p style={{ fontFamily: "jockey" }}>{focus} {DAYS[(parseInt(focus) - 1) % 7]}</p>
                <img className="w-6" src={Plus} alt="" />
              </div>
              <div className="overflow-y-auto h-[55vh]">
                {DATACHECKBOX.map((value, index) =>{
                  return <CheckBox text={value} key={index} index={index}/>
                })}
              </div>
            </div>
          </div>
        </div>
        {/* //Task Status */}
        <div
          style={{ backgroundColor: "#FBF7F0" }}
          className="rounded-xl mt-6 mb-6 col-span-1"
        >
          <div className="flex justify-end">
            <img className="w-4/5" src={RightBackground} alt="" />
          </div>
          <div className="text-center">
            <p
              className="text-7xl mt-12"
              style={{ color: "#75C9A8", fontFamily: "jockey" }}
            >
              43%
            </p>
            <p
              className="text-xl"
              style={{ color: "#B5B7B9", fontFamily: "jockey" }}
            >
              Completed Tasks
            </p>
            <div className="mt-16 lg:mt-12 xl:mt-8 px-4 mx-auto">
              <DonutChart />
            </div>
            <div className="px-6">
              <button
                className="w-full py-1 border text-sm rounded mt-8"
                style={{
                  fontFamily: "jockey",
                  borderColor: "#768592",
                  color: "#858585",
                }}
              >
                View your tasks
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
