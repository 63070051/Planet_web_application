import React, { useState, useContext, useEffect, useRef } from "react";
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
import Down_arrow from "../assets/down_arrow.svg";
import moment from "moment";
import axios from "axios";
import path from "../../path";
import Loading from "../component/Loading";
import circleTask from "../assets/circle_task.svg";
import triangle from "../assets/triangle-noti.svg";
import { Link } from "react-router-dom";
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

function TodoList() {
  const [focus, setFocus] = useState(new Date().getDate());
  const [focusMonth, setFocusMonth] = useState(MONTH[new Date().getMonth()]);
  const [focusDay, setFocusDay] = useState(
    new Date().toLocaleString("en-us", { weekday: "long" })
  );
  const [focusCalendar, setFocusCalendar] = useState();
  const [allCalendar, setAllCalendar] = useState();
  const [myTodo, setMyTodo] = useState();
  const [create, setCreate] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const [user, setUser] = useState();
  const [percent, setPercent] = useState(0);
  const [load, setLoad] = useState(false);
  const [popup, setPopup] = useState(false);
  function RenderNotification() {
    if (popup) {
      return (
        <div className="flex items-center space-x-4 relative z-20">
          <div className="w-14 h-14 bg-[#FBF7F0] rounded-xl shadow-sm flex justify-center items-center cursor-pointer">
            <img
              className="w-10 cursor-pointer"
              src={Notification}
              onClick={() => {
                setPopup(!popup);
              }}
              alt=""
            />
          </div>
          <div
            className="w-[28rem] h-[25rem] absolute top-[4.8rem] right-0 bg-[#FBF7F0] border-[#E3DDDD] rounded-xl"
            style={{ "box-shadow": "0px 5px 15px rgba(0, 0, 0, 0.1)" }}
          >
            <img
              src={triangle}
              className="absolute -top-4 right-[4.2rem]"
              alt=""
            />
            <div
              id="head-notification"
              className="text-2xl py-5 px-6 font-jockey border"
            >
              Notifications
            </div>
            <div id="content-notification">
              <div
                id="notification-items"
                className="border py-5 px-6 flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <img src={circleTask} alt="" />
                  <div id="detail-notification" className="">
                    <p className="font-jockey text-lg uppercase">todo list</p>
                    <span className="font-jura text-[#8a97a0]">
                      4 tasks now
                    </span>
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-sm bg-transparent py-1 px-6 border-2 rounded border-[#F08D6E] text-[#E5725D]"
                >
                  VIEW
                </button>
              </div>
            </div>
          </div>
          <img className="w-10" src={Profile} alt="" />
        </div>
      );
    } else {
      return (
        <div className="flex items-center space-x-4 relative">
          <div className=" cursor-pointer w-14 h-14 rounded-xl flex justify-center items-center">
            <img
              className="w-10"
              src={Notification}
              onClick={() => {
                setPopup(!popup);
              }}
              alt=""
            />
          </div>
          <Link to="/Profile">
            <img className="w-10" src={Profile} alt="" />
          </Link>
        </div>
      );
    }
  }
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

  function GetCalendar() {
    axios
      .post(
        `${path}/calendar`,
        { id: localStorage.getItem("id") },
        {
          onDownloadProgress: (progressEvent) => {
            let percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setPercent(percentCompleted);
          },
        }
      )
      .then((res) => {
        setAllCalendar(res.data);
        setFocusCalendar(res.data[focusMonth]);
        setTimeout(() => {
          setLoad(true);
        }, 400);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  function GetTodo() {
    axios
      .post(`${path}/mytodo`, {
        id: localStorage.getItem("id"),
        day: focus,
        month: focusMonth,
      })
      .then((res) => {
        if (Object.keys(res.data).length != 0) {
          setMyTodo(res.data.userTodo);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }
  useEffect(() => {
    GetTodo();
    GetUser();
    GetCalendar();
  }, []);

  function CheckBox(props) {
    const [index, setIndex] = useState(props.index);
    const [checked, setChecked] = useState(props.item.status);
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
            onChange={() => {
              UpdateStatus(index, !checked);
            }}
            className="w-4 h-4 border-gray-300 rounded accent-[#FFAA9B]"
          />
          <p style={{ fontFamily: "jura" }}>{props.item.todo}</p>
        </div>
        <div>
          <img
            className="py-4"
            onClick={() => {
              if (confirm("Confirm Delete Todo")) {
                DeleteTodo(props.index);
              }
            }}
            src={Minus}
            alt=""
          />
        </div>
      </div>
    );
  }

  function ChangeTaskDay(day) {
    setNewTodo("");
    setCreate(false);
    axios
      .post(`${path}/mytodo`, {
        id: localStorage.getItem("id"),
        day: day,
        month: focusMonth,
      })
      .then((res) => {
        if (Object.keys(res.data).length != 0) {
          setMyTodo(res.data.userTodo);
        } else {
          setMyTodo([]);
        }
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function ChangeTaskDayOnMonth(day, month) {
    setNewTodo("");
    setCreate(false);
    axios
      .post(`${path}/mytodo`, {
        id: localStorage.getItem("id"),
        day: day,
        month: month,
      })
      .then((res) => {
        if (Object.keys(res.data).length != 0) {
          setMyTodo(res.data.userTodo);
          console.log(res.data);
        } else {
          setMyTodo([]);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function DayComponent(props) {
    return (
      <div
        className="rounded-full border py-2 w-10 my-2 cursor-pointer"
        style={{
          borderColor: props.bg,
          backgroundColor: props.bg,
          fontFamily: "jura",
        }}
        onClick={() => {
          setFocus(props.day);
          setFocusDay(props.days.toUpperCase());
          ChangeTaskDay(props.day);
        }}
      >
        <p className="text-center text-xl" style={{ color: props.color }}>
          {props.day}
        </p>
        <p
          className="text-xs text-center font-bold"
          style={{ color: props.color }}
        >
          {props.days.toUpperCase().slice(0, 3)}
        </p>
      </div>
    );
  }

  function UpdateStatus(index, status) {
    axios
      .post(`${path}/updatetodostatus`, {
        id: localStorage.getItem("id"),
        month: focusMonth,
        day: focus,
        index: index,
        status: status,
      })
      .then(() => {})
      .catch(() => {
        console.log(err);
      });
  }

  function DeleteTodo(index) {
    let array = myTodo;
    array.splice(index, 1);
    setMyTodo([...array]);
    axios
      .put(`${path}/mytodo`, {
        id: localStorage.getItem("id"),
        month: focusMonth,
        day: focus,
        todo: { userTodo: array },
      })
      .then((res) => {
        if (res.data == "successfully") {
          setNewTodo("");
          setCreate(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function AddTodo() {
    const setTodo = {
      todo: newTodo,
      status: false,
    };
    let array = myTodo;
    array.push(setTodo);
    setMyTodo(array);
    setCreate(false);
    axios
      .put(`${path}/mytodo`, {
        id: localStorage.getItem("id"),
        month: focusMonth,
        day: focus,
        todo: { userTodo: array },
      })
      .then((res) => {
        if (res.data == "successfully") {
          setNewTodo("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="select-none">
      {/* // Body Grid */}
      {load ? (
        <div
          className="grid grid-cols-5 gap-4 min-h-screen pr-6"
          style={{ backgroundColor: "#EFEADE" }}
        >
          {/* // Navigation Bar */}
          <NavigationBar />
          {/* // Todo Body */}
          <div className="col-span-3 px-2 pt-6">
            {user && (
              <div className="flex justify-between items-center">
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
                <RenderNotification />
              </div>
            )}
            <div
              className="mt-6 rounded-xl pt-8 px-8 pb-6 h-[85%]"
              style={{ backgroundColor: "#FBF7F0" }}
            >
              <div className="flex items-center justify-between">
                <p className="text-2xl" style={{ fontFamily: "jockey" }}>
                  TO DO LIST
                </p>
                <div className="relative cursor-pointer">
                  <select
                    defaultValue={focusMonth}
                    onChange={(e) => {
                      setFocusCalendar(allCalendar[e.target.value]);
                      setFocusMonth(e.target.value);
                      if (
                        Object.keys(allCalendar[e.target.value]).length < focus
                      ) {
                        setFocusDay(
                          allCalendar[e.target.value][
                            new Date().getDate()
                          ].day.toUpperCase()
                        );
                        setFocus(new Date().getDate());
                      } else {
                        setFocusDay(
                          allCalendar[e.target.value][focus].day.toUpperCase()
                        );
                      }
                      ChangeTaskDayOnMonth(focus, e.target.value);
                    }}
                    className="p-2.5 w-40 cursor-pointer text-gray-500 text-lg text-right pr-8 z-40 bg-[#FBF7F0] outline-none appearance-none focus:border-indigo-600"
                    style={{ fontFamily: "jura" }}
                  >
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                  </select>
                  <img
                    className="w-3 absolute top-1 bottom-0 right-2 m-auto -rotate-90"
                    src={Down_arrow}
                    alt=""
                  />
                </div>
              </div>
              <div className="relative flex items-center">
                <div className="grid grid-flow-col auto-cols-max gap-2 overflow-x-scroll ">
                  {focusCalendar &&
                    Object.keys(focusCalendar).map((value, index) => {
                      return index + 1 == focus ? (
                        <DayComponent
                          day={index + 1}
                          days={focusCalendar[value].day}
                          color={"white"}
                          bg={"#FFAA9B"}
                          key={index}
                        />
                      ) : (
                        <DayComponent
                          day={index + 1}
                          days={focusCalendar[value].day}
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
                <div className="text-xl flex justify-between items-center px-6 py-4">
                  <p style={{ fontFamily: "jockey" }}>
                    {focus} {focusDay}
                  </p>
                  <img
                    onClick={() => {
                      setCreate(true);
                    }}
                    className="w-6 cursor-pointer"
                    src={Plus}
                    alt=""
                  />
                </div>
                <div className="overflow-y-auto h-80">
                  {create && (
                    <div className="p-2 px-4 flex  itemscenter justify-between border-t">
                      <input
                        className="bg-[#FBF7F0] p-2 outline-none w-1/2"
                        id="todo"
                        type="text"
                        placeholder="Enter New Todo here"
                        onChange={(e) => {
                          setNewTodo(e.target.value);
                        }}
                      />
                      <div className="space-x-2 py-2">
                        <button
                          onClick={() => {
                            setNewTodo("");
                            setCreate(false);
                          }}
                          className="border rounded px-3 text-[#F08D6E] border-[#F08D6E]"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => {
                            AddTodo();
                          }}
                          className=" rounded px-3 text-white bg-[#F08D6E]"
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  )}
                  {myTodo &&
                    myTodo.map((value, index) => {
                      return (
                        <CheckBox item={value} key={index} index={index} />
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
          {/* //Task Status */}
          <div
            style={{ backgroundColor: "#FBF7F0" }}
            className="rounded-xl mt-6 mb-6 col-span-1 h-[93.5%]"
          >
            <div className="flex justify-end ">
              <img className="w-4/5" src={RightBackground} alt="" />
            </div>
            <div className="text-center">
              <p
                className="text-7xl "
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

              <div className=" px-4 mx-auto relative">
                <img
                  className="absolute w-10 right-0 bottom-0 left-0 top-0 m-auto"
                  src={Plus}
                  alt=""
                />
             
                  <DonutChart />
                
              </div>
              <Link to="/Task" className="px-6">
                <button
                  className="w-60 py-1 border text-lg rounded mt-5"
                  style={{
                    fontFamily: "jockey",
                    borderColor: "#768592",
                    color: "#858585",
                  }}
                >
                  View your tasks
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <Loading percent={percent} />
      )}
    </div>
  );
}

export default TodoList;
