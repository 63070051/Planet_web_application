import React, { useEffect, useState, useRef } from "react";
import DonutChartTask from "../component/DonutCharTaskPage";
import "../fonts/Jockey_One/JockeyOne-Regular.ttf";
import "../fonts/Kumbh_Sans/static/KumbhSans-Regular.ttf";
import "../fonts/JetBrains_Mono/JetBrainsMono-VariableFont_wght.ttf";
import NavigationBar from "../component/NavigationBar";
import Notification from "../assets/notification.svg";
import Profile from "../assets/profile.svg";
import axios from "axios";
import path from "../../path";
import { Link } from "react-router-dom";
import addTask from "../assets/bgAddTask.png";
import circleTask from "../assets/circle_task.svg";
import triangle from "../assets/triangle-noti.svg";
import Loading from "../component/Loading";
import NavFile from "../component/NavFile";
import moment from "moment";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";

function RenderTask({ task, index }) {
  let todo = task[Object.keys(task)].columns["column-1"].taskIds.length;
  let inprogress = task[Object.keys(task)].columns["column-2"].taskIds.length;
  let done = task[Object.keys(task)].columns["column-3"].taskIds.length;
  let cal;
  if (done == 0) {
    cal = 0;
  } else {
    cal = 100 / (todo + inprogress + done);
  }

  const [percent, setPercent] = useState(parseInt(done * cal) + "%");
  const myObj = {
    task: task,
    index: index,
  };
  return (
    <Link
      onClick={() => {
        UpdateFocus(Object.keys(task)[0], index);
      }}
      to="/project_task"
      state={myObj}
      className="col-span-1 rounded h-[200px] border-2 border-[#D9DADA] p-6 flex relative "
    >
      <div className="project-detail flex flex-col justify-between w-1/2 ">
        <div className="">
          <h1
            id="topic-project"
            className="text-xl font-jura font-bold text-[#00213F]"
          >
            {Object.keys(task)}
          </h1>
          <p
            id="detail-project"
            className="h-12 mt-1 font-jura text-sm font-bold text-[#B5B7B9]"
          >
            {task[Object.keys(task)].description}
          </p>
          {task[Object.keys(task)].star != 0 ? (
            <Rater className="flex pb-4 text-xl" rating={task[Object.keys(task)].star} />
          ) : null}
        </div>
        <p
          id="date-project"
          className="font-jura text-md font-bold text-[#E5725D]"
        >
          {moment(task[Object.keys(task)].date).format("LL")}
        </p>
      </div>
      <div className="w-1/2 flex justify-center items-center relative">
        <p
          className="text-4xl absolute"
          style={{ color: "#75C9A8", fontFamily: "jockey" }}
        >
          {percent}
        </p>
        <DonutChartTask task={task[Object.keys(task)]} cutout={"75%"} />
      </div>
    </Link>
  );
}

function UpdateFocus(project, index) {
  axios
    .post(`${path}/focusproject`, {
      id: localStorage.getItem("id"),
      focus: {
        id: localStorage.getItem("id"),
        index: index,
        project: project,
      },
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function Task() {
  const [allTask, setAllTask] = useState();
  const [modal, setModal] = useState(false);
  const [date, setDate] = useState("");
  const dateInputRef = useRef(null);
  const [load, setLoad] = useState(false);
  const [percent, setPercent] = useState(0);
  const [user, setUser] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [popup, setPopup] = useState(false);

  const handleChange = (e) => {
    setDate(e.target.value);
    console.log(e.target.value);
  };
  function AddTask() {
    const newTask = {};
    const myObj = {};
    let array = [];
    myObj["id"] = localStorage.getItem("id");
    newTask[title] = {
      columnOrder: ["column-1", "column-2", "column-3"],
      columns: {
        "column-1": {
          id: "column-1",
          taskIds: [],
          title: "TO-DO",
        },
        "column-2": {
          id: "column-2",
          taskIds: [],
          title: "IN-PROGRESS",
        },
        "column-3": {
          id: "column-3",
          taskIds: [],
          title: "COMPLETED",
        },
      },
      tasks: {},
      date: date,
      description: description,
      star: 0,
    };
    myObj["task"] = newTask;
    const setNewTask = myObj.task;
    axios
      .put(`${path}/mytask`, myObj)
      .then((res) => {
        if (res.data == "successfully") {
          setAllTask([...allTask, setNewTask]);
        }
      })
      .catch((err) => console.log(err));
  }

  function GetAllTask() {
    axios
      .post(
        `${path}/getalltask`,
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
        setAllTask(res.data);
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
      .post(
        `${path}/user`,
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
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    GetUser();
    GetAllTask();
  }, []);
  return (
    <div className="select-none">
      {/* // Body Grid */}
      {load ? (
        <div
          className="grid grid-cols-4 lg:grid-cols-5 min-h-screen pb-20 sm:pb-0"
          style={{ backgroundColor: "#EFEADE" }}
        >
          {modal && (
            <div
              id="modal-review"
              className="w-full h-screen flex justify-center items-center absolute z-40"
            >
              <div
                className="w-full h-full bg-[#6D6D68] absolute opacity-50"
                onClick={() => {
                  setModal(false);
                }}
              ></div>
              <div
                id="modal-box"
                className="w-[40rem] h-[28rem] rounded-2xl bg-[#FBF7F0] z-50"
              >
                <div className="flex justify-center items-center  ">
                  <div className="w-full flex flex-col space-y-4 justify-center pl-9">
                    <p className="font-jockey text-2xl mt-4">CREATE NEW TASK</p>
                    <div className="flex flex-col">
                      <label htmlFor="" className="text-gray-500">
                        Title
                      </label>
                      <input
                        onChange={(e) => {
                          setTitle(e.target.value);
                        }}
                        type="text"
                        className="w-4/5 p-1 border-2 border-gray-300 rounded bg-[#FBF7F0] outline-none"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="" className="text-gray-500">
                        Description
                      </label>
                      <textarea
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                        type="text"
                        className="w-4/5 h- p-1 border-2 border-gray-300 rounded bg-[#FBF7F0] outline-none"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="" className="text-gray-500">
                        Dateline
                      </label>
                      <input
                        type="date"
                        onChange={handleChange}
                        ref={dateInputRef}
                        className="w-4/5 h- p-1 border-2 text-gray-500 border-gray-300 rounded bg-[#FBF7F0] outline-none"
                      />
                    </div>
                    <div className="flex space-x-2 w-4/5">
                      <button
                        onClick={() => {
                          setModal(false);
                        }}
                        className="border w-1/2 py-1 border-[#E5725D] text-[#E5725D] rounded-sm"
                      >
                        CANCLE
                      </button>
                      <button
                        onClick={() => {
                          setModal(false);
                          AddTask();
                        }}
                        className="border w-1/2 py-1 bg-[#E5725D] text-white rounded-sm"
                      >
                        CREATE
                      </button>
                    </div>
                  </div>
                  <div className="">
                    <img src={addTask} width={307} alt="" />
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* // Navigation Bar */}
          <NavigationBar />
          {/* // Todo Body */}
          <div className="col-span-4 px-4 mx-10 h-full">
            <NavFile
              status={localStorage.getItem("incom")}
              allstatus={localStorage.getItem("allstatus")}
            />
            <div
              className="h-[35%] sm:h-[80%] rounded-2xl relative pt-8 px-8 pb-6"
              style={{ backgroundColor: "#FBF7F0" }}
            >
              <div className="flex justify-between">
                <p className="font-jockey text-2xl">My Tasks</p>
                <button
                  type="submit"
                  onClick={() => {
                    setModal(true);
                  }}
                  className="h-7 px-8 rounded-md bg-[#F08D6E] font-jura font-bold text-sm text-white"
                >
                  CREATE
                </button>
              </div>
              <div
                className="grid grid-cols-1 sm:grid-cols-3 gap-0 sm:gap-4 mt-10 relative"
                style={{ backgroundColor: "#FBF7F0" }}
              >
                {allTask &&
                  allTask.map((task, index) => (
                    <RenderTask task={task} key={index} index={index} />
                  ))}
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

export default Task;
