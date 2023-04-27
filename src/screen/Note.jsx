import React, { useEffect, useState } from "react";
import NavigationBar from "../component/NavigationBar";
import Notification from "../assets/notification.svg";
import Profile from "../assets/profile.svg";
import Delete from "../assets/delete.svg";
import "../fonts/Jura/static/Jura-Bold.ttf";
import "../fonts/Jockey_One/JockeyOne-Regular.ttf";
import "../fonts/Kumbh_Sans/static/KumbhSans-Regular.ttf";
import "../fonts/JetBrains_Mono/JetBrainsMono-VariableFont_wght.ttf";
import { useLocation } from "react-router-dom";
import axios from "axios";
import path from "../../path";
import Loading from "../component/Loading";
import circleTask from "../assets/circle_task.svg";
import triangle from "../assets/triangle-noti.svg";
import { Link } from "react-router-dom";
function Note() {
  const [edit, setEdit] = useState(false);
  const [deleteNote, setDeletenote] = useState(false);
  const location = useLocation();
  const myNote = location.state;
  const [description, setDescription] = useState();
  const [topic, setTopic] = useState();
  const [user, setUser] = useState();
  const [load, setLoad] = useState(false);
  const [percent, setPercent] = useState(0);
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
  if (myNote == null) {
    window.location.replace("/AllNotes");
  }
  function UpdateNote() {
    axios
      .post(
        "https://2a4ce4nw26.execute-api.us-east-1.amazonaws.com/Dev/updatenote",
        {
          id: localStorage.getItem("id"),
          index: myNote.index,
          note: {
            topic: topic,
            description: description,
          },
        }
      )
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  }
  function GetNote() {
    axios
      .post(
        "https://2a4ce4nw26.execute-api.us-east-1.amazonaws.com/Dev/getnote",
        {
          id: localStorage.getItem("id"),
          index: myNote.index,
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
        setDescription(res.data.description);
        setTopic(res.data.topic);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    GetUser();
    GetNote();
  }, []);
  function GetUser() {
    axios
      .post(`${path}/user`, { id: localStorage.getItem("id") })
      .then((res) => {
        setUser(res.data);
        setTimeout(() => {
          setLoad(true);
        }, 400);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className="selcet-none" style={{ backgroundColor: "#EFEADE" }}>
      {load ? (
        <div
          className="grid grid-cols-6  min-h-screen pr-6"
          style={{ backgroundColor: "#EFEADE" }}
        >
          {/* Navigation */}
          <NavigationBar />

          <div className="col-span-6 lg:col-span-5 mr-10 ml-10 px-4 h-full">
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
                <RenderNotification />
              </div>
            )}

            {/* Note */}
            <div className=" rounded-xl h-[80%] p-8 space-y-5 " style={{ backgroundColor: "#FBF7F0" }}>
              <div>
                <div className="text-xl flex justify-between items-center py-2">
                  <p className="text-2xl" style={{ fontFamily: "jockey" }}>
                    My Note
                  </p>
                  <button
                    onClick={() => {
                      setEdit(!edit);
                      if (edit) {
                        UpdateNote();
                      }
                    }}
                    className=" rounded w-24 text-base"
                    style={{ backgroundColor: "#F08D6E", color: "#FBF7F0" }}
                  >
                    {edit ? "UPDATE" : "EDIT"}
                  </button>
                </div>
              </div>
              {/* textarea */}
              <div
                className="border rounded "
                style={{ borderColor: "#D9DADA" }}
              >
                <div className="w-full mt-2 border-b-2">
                  <div className="text-xl flex justify-between items-center px-6 py-2">
                    <div className="p-2">
                      <p
                        className="text-6xl"
                        style={{ color: "#B5B7B9", fontFamily: "jura" }}
                      >
                        {myNote.index + 1 < 10
                          ? "0" + (myNote.index + 1)
                          : myNote.index + 1}
                      </p>
                      {edit ? (
                        <input
                          className=" outline-none bg-[#FBF7F0] "
                          style={{ fontFamily: "jura" }}
                          defaultValue={topic}
                          onChange={(e) => {
                            setTopic(e.target.value);
                          }}
                        />
                      ) : (
                        <p
                          className="text-[#00213F]"
                          style={{ fontFamily: "jura" }}
                        >
                          {topic}
                        </p>
                      )}
                    </div>
                    {/* Delete */}
                    <button
                      onClick={() => {
                        if (confirm("Are you sure delete")) {
                        } else {
                        }
                      }}
                    >
                      <img className="w-9" src={Delete} alt="" />
                    </button>
                  </div>
                </div>
                <div
                  className=" w-full items-center px-6 py-4 "
                  style={{ borderColor: "#D9DADA" }}
                >
                  <div className="p-2 space-y-5">
                    {edit ? (
                      <textarea
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                        defaultValue={description}
                        className="w-full h-48 bg-[#FBF7F0] outline-none resize-none"
                        style={{ fontFamily: "jura", color: "#00213F" }}
                      ></textarea>
                    ) : (
                      <p
                        className="w-full break-words"
                        style={{ fontFamily: "jura", color: "#00213F" }}
                      >
                        {description}
                      </p>
                    )}
                    <p
                      className="pt-2"
                      style={{ color: "#B5B7B9", fontFamily: "jura" }}
                    >
                      26 Feb, 2022
                    </p>
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

export default Note;
