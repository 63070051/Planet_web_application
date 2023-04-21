import React, { useState } from "react";
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
import Edit from "../assets/edit.png";
import H_bg from "../assets/hamburger_bg.png";

function Dashboard(props) {
  const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
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

  function DayComponent(props) {
    return (
      <div
        className="rounded-full border py-2 w-10 my-2 cursor-pointer "
        style={{
          borderColor: props.bg,
          backgroundColor: props.bg,
          fontFamily: "jura",
        }}
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
            onChange={() => {}}
            className="w-4 h-4 border-gray-300 rounded accent-[#FFAA9B]"
          />
          <p style={{ fontFamily: "jura" }}>{props.text}</p>
        </div>
        <img src={Minus} alt="" />
      </div>
    );
  };
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
        <div className="col-span-4 px-4 h-full">
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
          {/* graph */}
          <div
            className="grid grid-cols-1 sm:grid-cols-3 gap-0 sm:gap-4 h-[35%] sm:h-[30%] rounded-2xl relative"
            style={{ backgroundColor: "#FBF7F0" }}
          >
            <div className="rounded-2xl cols-span-1 flex items-center justify-center">
              <div className="text-center">
                <p
                  className="text-7xl"
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
              </div>
            </div>
            <div className="h-full sm:flex items-center justify-center hidden">
              <div className="space-y-3">
                <div>
                  <div className="flex space-x-3 items-center">
                    <div className="w-5 h-5 rounded-full bg-[#FFAA9B]"></div>
                    <p
                      className="text-2xl font-light"
                      style={{ fontFamily: "jockey" }}
                    >
                      TO DO
                    </p>
                  </div>
                  <p
                    style={{ fontFamily: "jura" }}
                    className="ml-8 text-sm text-gray-400"
                  >
                    4 tasks now
                  </p>
                </div>
                <div>
                  <div className="flex space-x-3 items-center">
                    <div className="w-5 h-5 rounded-full bg-[#CFCFAB]"></div>
                    <p
                      className="text-2xl font-light"
                      style={{ fontFamily: "jockey" }}
                    >
                      IN PROGRESS
                    </p>
                  </div>
                  <p
                    style={{ fontFamily: "jura" }}
                    className="text-sm text-gray-400 ml-8"
                  >
                    1 tasks now
                  </p>
                </div>
                <div>
                  <div className="flex space-x-3 items-center">
                    <div className="w-5 h-5 rounded-full bg-[#75C9A8]"></div>
                    <p
                      className="text-2xl font-light"
                      style={{ fontFamily: "jockey" }}
                    >
                      DONE
                    </p>
                  </div>
                  <p
                    style={{ fontFamily: "jura" }}
                    className="ml-8 text-sm text-gray-400"
                  >
                    2 completed
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-[120px] sm:w-[200px] relative">
                <img
                  className="m-auto absolute top-0 right-0 bottom-0 left-0 w-6 sm:w-10"
                  src={Plus}
                  alt=""
                />
                <DonutChart />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 h-[50%]">
            <div className="col-span-1">
              <div
                className="w-full border rounded-lg h-full"
                style={{ backgroundColor: "#FBF7F0" }}
              >
                <div className="text-xl flex justify-between items-center px-6 py-2">
                  <p style={{ fontFamily: "jockey" }}>1 may</p>
                  <img className="w-6" src={Plus} alt="" />
                </div>
                <div className="overflow-y-auto h-[150px] sm:h-[360px]">
                  {DATACHECKBOX.map((value, index) => {
                    return <CheckBox text={value} key={index} index={index} />;
                  })}
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <div
                className="w-full border rounded-lg h-full relative"
                style={{ backgroundColor: "#FBF7F0" }}
              >
                <div className="text-xl flex justify-between items-center px-6 py-2">
                  <p style={{ fontFamily: "jockey" }}>1 may</p>
                  <img className="w-6" src={Plus} alt="" />
                </div>
                <div className="overflow-y-scroll h-[150px]  sm:h-[360px]">
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
  );
}

export default Dashboard;
