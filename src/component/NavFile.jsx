import React, { useState, useEffect } from "react";
import circleTask from "../assets/circle_task.svg";
import triangle from "../assets/triangle-noti.svg";
import Notification from "../assets/notification.svg";
import Profile from "../assets/profile.svg";
import axios from "axios";
import path from "../../path";
import { Link } from "react-router-dom";
import DonutChartTodo from "./DonutChartTodo";
import { Buffer } from "buffer";
function NavFile({ status, allstatus }) {
  const [user, setUser] = useState();
  const [imageURLs, setImageURLs] = useState();
  function GetUser() {
    axios
      .post(`${path}/user`, { id: localStorage.getItem("id") })
      .then((res) => {
        setUser(res.data);
        if (res.data.image != "") {
          axios
            .post(`${path}/getprofile`, {
              path: res.data.image,
            })
            .then((res) => {
              const b64 = new Buffer(res.data.data).toString("base64");
              setImageURLs([`data:*/*;base64, ${b64}`]);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    GetUser();
  }, []);
  const [popup, setPopup] = useState(false);
  function RenderNotActive() {
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
          {imageURLs ? <img className="w-10 rounded-full h-10 object-cover" src={imageURLs} alt="" /> : <img className="w-10 rounded-full h-10 object-cover" src={Profile} alt="" />}
        </Link>
      </div>
    );
  }
  function RenderActive() {
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
          style={{ boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)" }}
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
          {status != 0 ? (
            <div id="content-notification">
              <div
                id="notification-items"
                className="border py-5 px-6 flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-16">
                    <DonutChartTodo
                      todo={status}
                      done={allstatus}
                      cutout={"0%"}
                    />
                  </div>
                  <div id="detail-notification" className="">
                    <p className="font-jockey text-lg uppercase">todo list</p>
                    <span className="font-jura text-[#8a97a0]">
                      {status} tasks now
                    </span>
                  </div>
                </div>
                <Link
                  to="/todo"
                  className="text-sm bg-transparent py-1 px-6 border-2 rounded border-[#F08D6E] text-[#E5725D]"
                >
                  VIEW
                </Link>
              </div>
            </div>
          ) : null}
        </div>
        <img className="w-10" src={Profile} alt="" />
      </div>
    );
  }
  return (
    <div className=" h-[15%]">
      {user && (
        <div className="flex justify-between items-center h-full">
          <div>
            <p className="text-2xl" style={{ fontFamily: "jockey" }}>
              Welcome back, {user.firstname + " " + user.lastname}
            </p>
            <p className="text-xl" style={{ fontFamily: "Kumbh_Sans_Regular" }}>
              What’s Up Today?
            </p>
          </div>
          {popup == true ? <RenderActive /> : <RenderNotActive />}
        </div>
      )}
    </div>
  );
}
export default NavFile;
