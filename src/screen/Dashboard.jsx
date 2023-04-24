import React, { useEffect, useState } from "react";
import "../fonts/Jockey_One/JockeyOne-Regular.ttf";
import "../fonts/Kumbh_Sans/static/KumbhSans-Regular.ttf";
import "../fonts/JetBrains_Mono/JetBrainsMono-VariableFont_wght.ttf";
import DonutChart from "../component/DonutChart";
import Plus from "../assets/plus.svg";
import Minus from "../assets/minus.svg";
import NavigationBar from "../component/NavigationBar";
import Notification from "../assets/notification.svg";
import Profile from "../assets/profile.svg";
import Edit_note from "../assets/edit_note.svg";
import axios from "axios";
import path from "../../path";

function Dashboard(props) {
  const [myTodo, setMyTodo] = useState();
  const [myNote, setMyNote] = useState();
  const [user, setUser] = useState();
  const MONTH = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  useEffect(() => {
    axios
      .post(`${path}/mytodo`, {
        id: localStorage.getItem("id"),
        day: new Date().getDate(),
        month: MONTH[new Date().getMonth()],
      })
      .then((res) => {
        if (Object.keys(res.data).length != 0) {
          setMyTodo(res.data.userTodo);
        }
      })
      .catch((e) => {
        console.log(e);
      });
    axios
      .post(`${path}/mynote`, { id: localStorage.getItem("id") })
      .then((res) => {
        setMyNote(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    GetUser();
  }, []);
  function GetUser() {
    axios
      .post(`${path}/user`, { id: localStorage.getItem("id") })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
  }

  function RenderNote(props) {
    return (
      <div className="flex items-center justify-between">
        <p>{props.item.topic}</p>
        <img src="" alt="" />
      </div>
    );
  }

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
          {user && (
            <div className="flex justify-between items-center h-[15%]">
              <div>
                <p className="text-2xl" style={{ fontFamily: "jockey" }}>
                  Welcome back, {user.firstname + " " + user.lastname}
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
          )}
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
                  <p style={{ fontFamily: "jockey" }}>Today</p>
                  <img className="w-6" src={Plus} alt="" />
                </div>
                <div className="overflow-y-auto h-[150px] sm:h-[360px]">
                  {myTodo &&
                    myTodo.map((value, index) => {
                      return (
                        <CheckBox text={value} key={index} index={index} />
                      );
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
                  <p style={{ fontFamily: "jockey" }}>Note</p>
                  <img className="w-6" src={Plus} alt="" />
                </div>
                <div className="overflow-y-scroll h-[150px]  sm:h-[360px]">
                  {myNote &&
                    myNote.map((value, index) => {
                      // return <CheckBox text={value} key={index} index={index} />;
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div><div
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
                  <p style={{ fontFamily: "jockey" }}>Today</p>
                  <img className="w-6" src={Plus} alt="" />
                </div>
                <div className="overflow-y-auto h-[150px] sm:h-[360px]">
                  {myTodo &&
                    myTodo.map((value, index) => {
                      return (
                        <CheckBox text={value} key={index} index={index} />
                      );
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
                  <p style={{ fontFamily: "jockey" }}>Note</p>
                  <img className="w-6" src={Plus} alt="" />
                </div>
                <div className="overflow-y-scroll h-[150px]  sm:h-[360px]">
                  {myNote &&
                    myNote.map((value, index) => {
                      // return <CheckBox text={value} key={index} index={index} />;
                    })}
                </div>
              </div>
            </div>
          </div>
    </div>
  );
}

export default Dashboard;
