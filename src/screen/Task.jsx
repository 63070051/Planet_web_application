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
function RenderTask({ task, index }) {
  let todo = task[Object.keys(task)].columns["column-1"].taskIds.length;
  let inprogress = task[Object.keys(task)].columns["column-2"].taskIds.length;
  let done = task[Object.keys(task)].columns["column-3"].taskIds.length;
  let cal = 100 / (todo + inprogress + done);

  const [percent, setPercent] = useState(parseInt(done * cal) + "%");
  const myObj = {
    task: task,
    index: index,
  };
  return (
    <Link
      to="/project_task"
      state={myObj}
      className="col-span-1 h-[200px] border-2 border-[#D9DADA] p-6 flex relative "
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
            lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur,
            cupiditate.
          </p>
        </div>
        <p
          id="date-project"
          className="font-jura text-md font-bold text-[#E5725D]"
        >
          26 Feb, 2022
        </p>
      </div>
      <div className="w-1/2 flex justify-center items-center relative">
        <p
          className="text-4xl absolute"
          style={{ color: "#75C9A8", fontFamily: "jockey" }}
        >
          {percent}
        </p>
        <DonutChartTask task={task[Object.keys(task)]} />
      </div>
    </Link>
  );
}

function Task() {
  const [allTask, setAllTask] = useState();
  const [modal, setModal] = useState(false);
  const [date, setDate] = useState("");
  const dateInputRef = useRef(null);
  const [popup, setPopup] = useState(false);
  function RenderNotification() {
    if (popup) {
      return (
        <div className="flex items-center space-x-4 relative z-20">
          <div className="w-14 h-14 bg-[#FBF7F0] rounded-xl shadow-sm flex justify-center items-center">
            <img
              className="w-10"
              src={Notification}
              onClick={() => {
                setPopup(!popup);
              }}
              alt=""
            />
          </div>
          <div
            className="w-[32rem] h-[25rem] absolute top-[4.8rem] right-0 bg-[#FBF7F0] border-[#E3DDDD] rounded-xl"
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
                    <span className="font-jura text-[#8a97a0]">4 tasks now</span>
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-transparent py-1 px-6 border-2 border-[#F08D6E] text-[#E5725D]"
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
          <div className="w-14 h-14 rounded-xl flex justify-center items-center">

          <img
            className="w-10"
            src={Notification}
            onClick={() => {
              setPopup(!popup);
            }}
            alt=""
          />
          </div>
          <img className="w-10" src={Profile} alt="" />
        </div>
      );
    }
  }
  const handleChange = (e) => {
    setDate(e.target.value);
  };
  function GetAllTask() {
    axios
      .post(`${path}/getalltask`, { id: localStorage.getItem("id") })
      .then((res) => {
        setAllTask(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    GetAllTask();
  }, []);
  return (
    <div className="select-none">
      {/* // Body Grid */}
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
                      type="text"
                      className="w-4/5 p-1 border-2 border-gray-300 rounded bg-[#FBF7F0] outline-none"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="text-gray-500">
                      Description
                    </label>
                    <textarea
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
            <RenderNotification/>
            {/* <div className="flex items-center space-x-4 relative z-20">
                <img className="w-10" src={Notification} onClick={()=>{setPopup(!popup)}} alt="" />
                {
                  popup &&
                  (
                  <div className="w-[32rem] h-[25rem] absolute top-[4rem] right-0 bg-[#FBF7F0] border-[#E3DDDD] rounded-xl" style={{"box-shadow" : "0px 5px 15px rgba(0, 0, 0, 0.1)"}} >
                  <img src={triangle} className="absolute -top-4 right-[3.8rem]" alt="" />
                  <div id="head-notification" className="text-2xl py-5 px-6 font-jockey border">Notifications</div>
                  <div id="content-notification">
                    <div id="notification-items" className="border py-5 px-6 flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img src={circleTask} alt="" />
                        <div id="detail-notification" className="">
                          <p className="font-jockey text-lg uppercase">todo list</p>
                          <span className="font-jura text-[#8a97a0]">4 tasks now</span>
                        </div>
                      </div>
                      <button type="submit" className="bg-transparent py-1 px-6 border-2 border-[#F08D6E] text-[#E5725D]">VIEW</button>
                    </div>
                  </div>
                </div>)
                }
                
                <img className="w-10" src={Profile} alt="" />
              </div> */}
          </div>
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
    </div>
  );
}

export default Task;
