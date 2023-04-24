import React, { useEffect, useState } from "react";
import "../fonts/Jockey_One/JockeyOne-Regular.ttf";
import "../fonts/Kumbh_Sans/static/KumbhSans-Regular.ttf";
import "../fonts/JetBrains_Mono/JetBrainsMono-VariableFont_wght.ttf";
import NavigationBar from "../component/NavigationBar";
import Notification from "../assets/notification.svg";
import Profile from "../assets/profile.svg";
import { DragDropContext } from "@hello-pangea/dnd";
import Column from "../component/Column";
import axios from "axios";
import path from "../../path";
import DonutChart from "../component/DonutChart";

function Project_task() {
  const [state, setState] = useState();
  const [user, setUser] = useState();
  function GetTask() {
    axios
      .post(`${path}/mytask`, {
        id: localStorage.getItem("id"),
      })
      .then((res) => {
        setState(res.data);
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
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function UpdateTask(task) {
    console.log(task);
    axios
      .post(`${path}/updatetask`, {
        id: localStorage.getItem("id"),
        project: "project1",
        task: task,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    GetTask();
    GetUser();
  }, []);
  const onDragEnd = (result) => {
    const { destination, source } = result;

    // If user tries to drop in an unknown destination
    if (!destination) return;

    // if the user drags and drops back in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // If the user drops within the same column but in a different positoin
    const sourceCol = state.columns[source.droppableId];
    const destinationCol = state.columns[destination.droppableId];

    if (sourceCol.id === destinationCol.id) {
      const newColumn = reorderColumnList(
        sourceCol,
        source.index,
        destination.index
      );

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };
      setState(newState);
      return;
    }

    // If the user moves from one column to another
    const startTaskIds = Array.from(sourceCol.taskIds);
    const [removed] = startTaskIds.splice(source.index, 1);
    const newStartCol = {
      ...sourceCol,
      taskIds: startTaskIds,
    };

    const endTaskIds = Array.from(destinationCol.taskIds);
    endTaskIds.splice(destination.index, 0, removed);
    const newEndCol = {
      ...destinationCol,
      taskIds: endTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      },
    };

    setState(newState);
    UpdateTask(newState);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="select-none">
        {/* // Body Grid */}
        <div
          className="grid grid-cols-4 lg:grid-cols-5 min-h-screen pb-20 sm:pb-0"
          style={{ backgroundColor: "#EFEADE" }}
        >
          {/* // Navigation Bar */}
          <NavigationBar />
          {/* // Todo Body */}
          <div className="col-span-4 px-4 mx-10 h-full ">
            <div className="flex justify-between items-center h-[15%] ">
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
            <div className="">
              <div
                className="flex justify-between h-[35%] sm:h-[30%] rounded-2xl relative "
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
                    <button type="submit" className="bg-transparent border-2 text-[#E5725D] border-[#F08D6E] rounded-sm text-sm px-6 py-2">ADD TO DO</button>
                  </div>
                </div>
                <div className="h-full sm:flex items-center justify-center hidden ">
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
                    <DonutChart />
                  </div>
                  {/* <div className="w" style={}></div> */}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 sm:gap-4 mt-10 relative">
                {state &&
                  state.columnOrder.map((columnId) => {
                    const columns = state.columns[columnId];
                    const tasks = columns.taskIds.map(
                      (taskid) => state.tasks[taskid]
                    );
                    return (
                      <Column key={columns.id} column={columns} task={tasks} />
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}

export default Project_task;
