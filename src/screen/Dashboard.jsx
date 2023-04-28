import React, { useEffect, useState } from "react";
import "../fonts/Jockey_One/JockeyOne-Regular.ttf";
import "../fonts/Kumbh_Sans/static/KumbhSans-Regular.ttf";
import "../fonts/JetBrains_Mono/JetBrainsMono-VariableFont_wght.ttf";
import DonutChart from "../component/DonutChart";
import Plus from "../assets/plus.svg";
import Minus from "../assets/minus.svg";
import NavigationBar from "../component/NavigationBar";
import Edit_note from "../assets/edit_note.svg";
import axios from "axios";
import path from "../../path";
import { Link } from "react-router-dom";
import Loading from "../component/Loading";
import bgDash from "../assets/bg_project_task.png";
import NavFile from "../component/NavFile";
function Dashboard(props) {
  const [myTodo, setMyTodo] = useState();
  const [myNote, setMyNote] = useState();
  const [user, setUser] = useState();
  const [state, setState] = useState();
  const [done, setDone] = useState();
  const [todo, setTodo] = useState();
  const [inprogress, setInprogress] = useState();
  const [percent, setPercent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [inComplete, setInComplete] = useState(0);
  const [allStatus, setAllStatus] = useState(0);
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
  const [popup, setPopup] = useState(false);

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
          setLoading(true);
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
          console.log(1);
          setTimeout(() => {
            setLoading(true);
          }, 400);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function GetTodo() {
    axios
      .post(`${path}/mytodo`, {
        id: localStorage.getItem("id"),
        day: new Date().getDate(),
        month: MONTH[new Date().getMonth()],
      })
      .then((res) => {
        let count = 0;
        if (Object.keys(res.data).length != 0) {
          setMyTodo(res.data.userTodo);
          setAllStatus(res.data.userTodo.length)
          res.data.userTodo.forEach((element) => {
            if (!element.status) {
              count = count + 1;
            }
          });
          localStorage.setItem('incom', count)
          localStorage.setItem('allstatus', res.data.userTodo.length)
          setInComplete(count);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }
  function GetNote() {
    axios
      .post(`${path}/mynote`, { id: localStorage.getItem("id") })
      .then((res) => {
        setMyNote(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    GetTodo();
    GetNote();
    GetUser();
  }, []);

  function UpdateStatus(index, status) {
    axios
      .post(`${path}/updatetodostatus`, {
        id: localStorage.getItem("id"),
        month: MONTH[new Date().getMonth()],
        day: new Date().getDate(),
        index: index,
        status: status,
      })
      .then((res) => {
        if (res.data == "successfully") {
          GetTodo();
        }
      })
      .catch(() => {
        console.log(err);
      });
  }

  function CheckBox({ todo, status, index }) {
    const [index1, setIndex1] = useState(index);
    const [checked, setChecked] = useState(status);
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
            defaultChecked={status}
            onChange={() => {
              UpdateStatus(index1, !checked);
            }}
            className="w-4 h-4 border-gray-300 rounded accent-[#FFAA9B]"
          />
          <p style={{ fontFamily: "jura" }}>{todo}</p>
        </div>
        <img src={Minus} alt="" />
      </div>
    );
  }

  function RenderNote({ topic, description, index }) {
    const myObj = {
      index: index,
    };
    return (
      <div className="border-t flex justify-between items-center px-6 py-3">
        <p style={{ fontFamily: "jura" }}>{topic}</p>
        <Link to="/note" state={myObj}>
          <img src={Edit_note} alt="" />
        </Link>
      </div>
    );
  }

  return (
    <div className="select-none">
      {/* // Body Grid */}
      {loading ? (
        <div
          className="grid grid-cols-4 lg:grid-cols-5 min-h-screen pb-20 sm:pb-0"
          style={{ backgroundColor: "#EFEADE" }}
        >
          {/* // Navigation Bar */}
          <NavigationBar />
          {/* // Todo Body */}
          <div className="col-span-4 px-4 h-full">
            <NavFile status={inComplete} allstatus={allStatus}/>
            {/* graph */}
            <div
              className=" h-[35%] sm:h-[30%] rounded-2xl relative"
              style={{ backgroundColor: "#FBF7F0" }}
            >
              {state ? (
                <div className="grid grid-cols-3 lg:grid-cols-4 gap-0 sm:gap-4 h-full">
                  <div className="rounded-2xl cols-span-1 flex items-center justify-center">
                    <div className="text-center">
                      <p
                        className="text-7xl"
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
                          {todo} tasks now
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
                          {inprogress} tasks now
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
                          {done} completed
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="w-[120px] sm:w-[200px] relative">
                      <Link to="/Task">
                        <img
                          className="m-auto absolute top-0 right-0 bottom-0 left-0 w-6 sm:w-10"
                          src={Plus}
                          alt=""
                        />
                      </Link>
                      <DonutChart
                        todo={todo}
                        inprogress={inprogress}
                        done={done}
                      />
                    </div>
                  </div>
                  <div className="w-full hidden lg:block">
                    <img src={bgDash} alt="" />
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-4xl" style={{ fontFamily: "jura" }}>
                    You not have focus project
                  </p>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 h-[52.5%] ">
              <div className="col-span-1 h-[95%]">
                <div
                  className="w-full border rounded-lg h-full"
                  style={{ backgroundColor: "#FBF7F0" }}
                >
                  <div className="text-xl  flex justify-between items-center px-6 py-2">
                    <p style={{ fontFamily: "jockey" }}>Today</p>
                    <Link to="/Todo">
                      <img className="w-6" src={Plus} alt="" />
                    </Link>
                  </div>
                  <div className="overflow-y-auto sm:h-[87%] ">
                    {myTodo &&
                      myTodo.map((value, index) => {
                        return (
                          <CheckBox
                            todo={value.todo}
                            status={value.status}
                            index={index}
                            key={index}
                          />
                        );
                      })}
                  </div>
                </div>
              </div>
              <div className="col-span-1 h-[95%]">
                <div
                  className="w-full border rounded-lg h-full relative"
                  style={{ backgroundColor: "#FBF7F0" }}
                >
                  <div className="text-xl flex justify-between items-center px-6 py-2">
                    <p style={{ fontFamily: "jockey" }}>Note</p>
                    <Link to="/AddNote">
                      <img className="w-6" src={Plus} alt="" />
                    </Link>
                  </div>
                  <div className="overflow-y-scroll sm:h-[87%]">
                    {myNote &&
                      myNote.map((value, index) => {
                        return (
                          <RenderNote
                            topic={value.topic}
                            description={value.description}
                            key={index}
                            index={index}
                          />
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading percent={percent} />
      )}
    </div>
  );
}

export default Dashboard;
