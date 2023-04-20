import React, { useState, useEffect } from "react";
import NavigationBar from "../component/NavigationBar";
import Notification from "../assets/notification.svg";
import Profile from "../assets/profile.svg";
import { Link } from "react-router-dom";
import "../style.css";
import axios from "axios";
import path from "../../path";
export default function Allnotes() {
  const [data, setData] = useState();

  useEffect(() => {
    axios
      .post(`${path}/mynote`, { id: localStorage.getItem("id") })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log9(err);
      });
  }, []);

  return (
    <div className="h-screen">
      <div className="h-full grid grid-cols-6 bg-[#EFEADE]">
        <NavigationBar />
        <div className="col-span-6 lg:col-span-5 mr-10 ml-10 px-4 h-full">
          <div className="flex justify-between items-center  h-[15%] ">
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
              {data && data.map((item, index) => (
                <div
                  key={index}
                  className="h-[10rem] flex flex-col justify-between rounded border-[#D9DADA] border-2  p-4"
                >
                  <div>
                    <p
                      className="text-5xl text-[#8A97A0]"
                      style={{ fontFamily: "jura" }}
                    >
                      {index+1}
                    </p>
                    <p
                      className="text-lg font-semibold text-[#00213F]"
                      style={{ fontFamily: "jura" }}
                    >
                      {item[Object.keys(item)[0]].topic}
                    </p>
                  </div>
                  <p
                    className="text-lg text-[#B5B7B9]"
                    style={{ fontFamily: "jura" }}
                  >
                    {item[Object.keys(item)[0]].description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
