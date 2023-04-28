import React, { useState, useContext, useEffect, useRef } from "react";
import DonutChart from "../component/DonutChart";
import "../fonts/Jockey_One/JockeyOne-Regular.ttf";
import "../fonts/Kumbh_Sans/static/KumbhSans-Regular.ttf";
import "../fonts/JetBrains_Mono/JetBrainsMono-VariableFont_wght.ttf";
import RightBackground from "../assets/TodoRightBackground.png";
import Plus from "../assets/plus.svg";
import Minus from "../assets/minus.svg";
import NavigationBar from "../component/NavigationBar";
import Down_arrow from "../assets/down_arrow.svg";
import moment from "moment";
import axios from "axios";
import path from "../../path";
import Loading from "../component/Loading";
import { Link } from "react-router-dom";
import NavFile from "../component/NavFile";
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
  const [state, setState] = useState();
  const [done, setDone] = useState();
  const [todo, setTodo] = useState();
  const [inprogress, setInprogress] = useState();
  const [focusCalendar, setFocusCalendar] = useState();
  const [allCalendar, setAllCalendar] = useState();
  const [myTodo, setMyTodo] = useState();
  const [create, setCreate] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const [user, setUser] = useState();
  const [percent, setPercent] = useState(0);
  const [load, setLoad] = useState(false);
  const [popup, setPopup] = useState(false);
  const [allStatus, setAllStatus] = useState(0);
  const [inComplete, setInComplete] = useState(0);
  function GetTask(index, project) {
    axios
      .post(
        `${path}/mytask`,
        {
          id: localStorage.getItem("id"),
          index: index,
          project: project,
        },
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
        setState(res.data);
        setDone(res.data.columns["column-3"].taskIds.length);
        setInprogress(res.data.columns["column-2"].taskIds.length);
        setTodo(res.data.columns["column-1"].taskIds.length);

        setTimeout(() => {
          setLoad(true);
        }, 400);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function GetUser() {
    axios
      .post(`${path}/user`, { id: localStorage.getItem("id") })
      .then((res) => {
        setUser(res.data);
        if (res.data.focus != undefined) {
          GetTask(res.data.focus.index, res.data.focus.project);
        } else {
          setTimeout(() => {
            setLoad(true);
          }, 400);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function GetCalendar() {
    axios
      .post(`${path}/calendar`, { id: localStorage.getItem("id") })
      .then((res) => {
        setAllCalendar(res.data);
        setFocusCalendar(res.data[focusMonth]);
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
        let count = 0;
        if (Object.keys(res.data).length != 0) {
          setMyTodo(res.data.userTodo);
          if (focus == new Date().getDate()) {
            setAllStatus(res.data.userTodo.length);
            res.data.userTodo.forEach((element) => {
              if (!element.status) {
                count = count + 1;
              }
            });
            localStorage.setItem("incom", count);
            localStorage.setItem("allstatus", res.data.userTodo.length);
            setInComplete(count);
          }
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
      .then(() => {
        GetTodo();
      })
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
          GetTodo();
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
    let array = [];
    if (myTodo) {
      array = myTodo;
    }
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
          GetTodo();
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
          <div className="col-span-3 px-2">
            <NavFile
              status={localStorage.getItem("incom")}
              allstatus={localStorage.getItem("allstatus")}
            />
            <div
              className="rounded-xl px-8 pb-6 pt-6 h-[81%]"
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
            {state && (
              <div className="text-center space-y-6">
                <p
                  className="text-7xl "
                  style={{ color: "#75C9A8", fontFamily: "jockey" }}
                >
                  {parseInt((100 / (done + inprogress + todo)) * done)}%
                </p>
                <p
                  className="text-xl"
                  style={{ color: "#B5B7B9", fontFamily: "jockey" }}
                >
                  Completed Tasks
                </p>

                <div className=" px-4 mx-auto relative w-[80%]">
                  <img
                    className="absolute w-10 right-0 bottom-0 left-0 top-0 m-auto"
                    src={Plus}
                    alt=""
                  />

                  <DonutChart todo={todo} inprogress={inprogress} done={done} />
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
            )}
          </div>
        </div>
      ) : (
        <Loading percent={percent} />
      )}
    </div>
  );
}

export default TodoList;
