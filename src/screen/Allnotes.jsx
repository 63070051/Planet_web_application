import React, { useState, useEffect } from "react";
import NavigationBar from "../component/NavigationBar";
import Notification from "../assets/notification.svg";
import Profile from "../assets/profile.svg";
import { Link } from "react-router-dom";
import "../style.css";
import axios from "axios";
import path from "../../path";
import Loading from "../component/Loading";
export default function Allnotes() {
  const [data, setData] = useState();
  const [user, setUser] = useState();
  const [load, setLoad] = useState(false);
  const [percent, setPercent] = useState(0);
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
                <div className="flex items-center space-x-4">
                  <img className="w-10" src={Notification} alt="" />
                  <img className="w-10" src={Profile} alt="" />
                </div>
              </div>
            )}
            <div className="rounded-lg" style={{ backgroundColor: "#FBF7F0" }}>
              <div className="h-[4rem] flex justify-between pt-8 pl-8 pr-10 items-center">
                <p className="text-2xl" style={{ fontFamily: "jockey" }}>
                  My Notes
                </p>
                <button
                  type="submit"
                  className="px-8 bg-[#F08D6E]  text-white text-md rounded-sm"
                >
                  Add
                </button>
              </div>
              <div
                id="albumNote"
                className="overflow-scroll overflow-x-hidden h-[38rem] grid grid-cols-2 lg:grid-cols-3 gap-6 p-8 "
              >
                {data &&
                  data.map((item, index) => (
                    <RenderNote item={item} index={index} key={index} />
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
