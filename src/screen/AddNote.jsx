import React, { useState, useEffect } from "react";
import NavigationBar from "../component/NavigationBar";
import Notification from "../assets/notification.svg";
import Profile from "../assets/profile.svg";
import { Link } from "react-router-dom";
import "../style.css";
import axios from "axios";
import path from "../../path";
import Loading from "../component/Loading";
import del from "../assets/delete.svg";
import circleTask from "../assets/circle_task.svg";
import triangle from "../assets/triangle-noti.svg";
export default function AddNote() {
  const [data, setData] = useState();
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
  useEffect(() => {
    GetUser();
    GetNote();
  }, []);

  function GetNote() {
    axios
      .post(
        `${path}/mynote`,
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
        setData(res.data);
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
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function RenderNote(props) {
    const myObj = {
      index: props.index,
    };
    return (
      <Link
        to="/note"
        state={myObj}
        className="h-[10rem] flex flex-col justify-between rounded border-[#D9DADA] border-2  p-4"
      >
        <div>
          <p className="text-5xl text-[#8A97A0]" style={{ fontFamily: "jura" }}>
            {props.index + 1 < 10 ? "0" + (props.index + 1) : props.index + 1}
          </p>
          <p
            className="text-lg font-semibold text-[#00213F]"
            style={{ fontFamily: "jura" }}
          >
            {props.item.topic}
          </p>
        </div>
        <p
          className="text-lg text-[#B5B7B9] break-words truncate"
          style={{ fontFamily: "jura" }}
        >
          {props.item.description}
        </p>
      </Link>
    );
  }

  return (
    <div className="h-screen">
      {load ? (
        <div className="h-full grid grid-cols-6 bg-[#EFEADE]">
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
            <div
              className="rounded-lg h-[80%]"
              style={{ backgroundColor: "#FBF7F0" }}
            >
              <div className="h-[4rem] flex justify-between pt-8 pl-8 pr-10 items-center">
                <p className="text-2xl" style={{ fontFamily: "jockey" }}>
                  My Notes
                </p>
                <Link
                  to="/AddNote"
                  type="submit"
                  className="px-8 bg-[#F08D6E]  text-white text-md rounded-sm"
                >
                  DONE
                </Link>
              </div>
              <div
                id="albumNote"
                className="bh-[85%] w-full  lg:grid-cols-3 gap-6 p-8 "
              >
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
                          01
                        </p>

                        <input
                          className="w-96 outline-none bg-[#FBF7F0] "
                          style={{ fontFamily: "jura" }}
                          placeholder="Enter your topic here"
                        />
                      </div>
                      <div className="w-9 cursor-pointer">
                        <img src={del} alt="" />
                      </div>
                    </div>
                  </div>
                  <div
                    className=" w-full items-center px-6 py-4 "
                    style={{ borderColor: "#D9DADA" }}
                  >
                    <div className="p-2 space-y-5">
                      <textarea
                        // onChange={(e) => {
                        //   setDescription(e.target.value);
                        // }}
                        // defaultValue={description}
                        className="w-full h-48 bg-[#FBF7F0] outline-none resize-none"
                        style={{ fontFamily: "jura", color: "#00213F" }}
                        placeholder="Enter your note here"
                      ></textarea>

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
        </div>
      ) : (
        <Loading percent={percent} />
      )}
    </div>
  );
}
