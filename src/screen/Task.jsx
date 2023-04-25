import React, { useEffect, useState } from "react";
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

function RenderTask({task, index}) {
  let todo = task[Object.keys(task)].columns["column-1"].taskIds.length
  let inprogress = task[Object.keys(task)].columns["column-2"].taskIds.length
  let done = task[Object.keys(task)].columns["column-3"].taskIds.length
  let cal = 100 / (todo+inprogress+done);
  const [percent, setPercent] = useState(parseInt(done * cal) + "%");
  const myObj = {
    task : task,
    index : index
  }
  return (
    <Link to="/project_task" state={myObj} className="col-span-1 h-[200px] border-2 border-[#D9DADA] p-6 flex relative">
      <div className="project-detail flex flex-col justify-between w-1/2">
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
          <div
            className="h-[35%] sm:h-[80%] rounded-2xl relative pt-8 px-8 pb-6"
            style={{ backgroundColor: "#FBF7F0" }}
          >
            <div className="flex justify-between">
              <p className="font-jockey text-2xl">My Tasks</p>
              <button
                type="submit"
                className="h-7 px-8 rounded-md bg-[#F08D6E] font-jura font-bold text-sm text-white"
              >
                CREATE
              </button>
            </div>
            <div
              className="grid grid-cols-1 sm:grid-cols-3 gap-0 sm:gap-4 mt-10 relative"
              style={{ backgroundColor: "#FBF7F0" }}
            >
              {allTask && allTask.map((task, index) => <RenderTask task={task} key={index} index={index}/>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Task;
