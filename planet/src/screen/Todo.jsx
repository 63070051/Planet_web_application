import React, { useState, useContext } from "react";
import Hamberger from "../component/Hamburger";
import DonutChart from "../component/DonutChart";
import "../fonts/Jockey_One/JockeyOne-Regular.ttf";
import "../fonts/Kumbh_Sans/static/KumbhSans-Regular.ttf";
import "../fonts/JetBrains_Mono/JetBrainsMono-VariableFont_wght.ttf";
import RightBackground from "../assets/TodoRightBackground.png";
import Logo from "../assets/logo.svg";
import DashBoard from "../assets/dashboard.svg";
import Account from "../assets/account.svg";
import Notes from "../assets/notes.svg";
import Setting from "../assets/setting.svg";
import Todo from "../assets/todo.svg";
import Notification from "../assets/notification.svg";
import Profile from "../assets/profile.svg";
import H_bg from "../assets/hamburger_bg.png";
import { Link } from "react-router-dom";

const LinkTo = [
  {
    link: "/Dashboard",
    src: DashBoard,
    text: "DASHBOARD",
  },
  {
    link: "/Todo",
    src: Todo,
    text: "TO DO LIST",
  },
  {
    link: "/Note",
    src: Notes,
    text: "NOTES",
  },
  {
    link: "/Accounts",
    src: Account,
    text: "Account",
  },
  {
    link: "/Setting",
    src: Setting,
    text: "Setting",
  },
];

const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]

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
    <div className="rounded-full border py-2 px-2" style={{borderColor : "#D9D9D9"}}>
      <p className="text-center text-xl">{props.day}</p>
      <p className="text-xs">{props.days}</p>
    </div>
  );
}

function LinkNav(props) {
  return (
    <div className="duration-500 hover:bg-red-500 px-4 py-2 rounded-lg w-full">
      <div className="flex justify-center items-center">
        <Link
          className="w-full"
          to={props.obj.link}
          style={{ display: "flex", alignItems: "center" }}
        >
          <img className="ml-12 mr-0 w-8" src={props.obj.src} alt="" />{" "}
          <p className="text-center ml-4">{props.obj.text}</p>
        </Link>
      </div>
    </div>
  );
}

function TodoList() {
  return (
    <div>
      {/* // Body Grid */}
      <div
        className="grid grid-cols-5 gap-4 min-h-screen pr-6"
        style={{ backgroundColor: "#EFEADE" }}
      >
        {/* // Navigation Bar */}
        <div style={{ backgroundColor: "#FBF7F0" }} className="col-span-1">
          <div
            className="space-x-4 p-10"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontFamily: "jockey",
            }}
          >
            <img className="w-12" src={Logo} alt="" />
            <p className="text-2xl">Planet</p>
          </div>
          <div
            className="w-full"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div
              className="space-y-4 text-lg w-full"
              style={{ fontFamily: "jockey" }}
            >
              {LinkTo.map(function (object, i) {
                return <LinkNav obj={object} key={i} />;
              })}
            </div>
            <img className="absolute bottom-0 left-0 w-40" src={H_bg} alt="" />
          </div>
        </div>
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
            className="mt-6 rounded-xl pt-8 px-8 pb-6"
            style={{ backgroundColor: "#FBF7F0" }}
          >
            <p className="text-2xl" style={{ fontFamily: "jockey" }}>
              TO DO LIST
            </p>
            <div className="overflow-x-scroll flex space-x-2 py-2">
              {DAY.map((value, index) => {
                if(index > 7){

                }
                else{

                    return <DayComponent day={value.daynum} days={DAYS[((parseInt(value.daynum)-1) % 6)]} key={index}/>
                }
              })}
            </div>
          </div>
        </div>
        {/* //Task Status */}
        <div
          style={{ backgroundColor: "#FBF7F0" }}
          className="rounded-xl mt-6 mb-6"
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
            <div className="mt-12">
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
