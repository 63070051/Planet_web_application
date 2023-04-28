import React, { useState, useEffect } from "react";
import NavigationBar from "../component/NavigationBar";
import { Link, useLocation } from "react-router-dom";
import "../style.css";
import axios from "axios";
import path from "../../path";
import Loading from "../component/Loading";
import NavFile from "../component/NavFile";
import moment from "moment";
export default function AddNote() {
  const [data, setData] = useState();
  const [user, setUser] = useState();
  const [load, setLoad] = useState(false);
  const location = useLocation();
  const indexNote = location.state;
  const [percent, setPercent] = useState(0);
  const [popup, setPopup] = useState(false);
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  if (indexNote == null) {
    window.location.replace("/AllNotes");
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

  function PushNote() {
    if (confirm("Confirm to add note")) {
      axios
        .put(`${path}/mynote`, {
          id: localStorage.getItem("id"),
          note: {
            topic: topic,
            description: description,
            date: date,
          },
        })
        .then((res) => {
          if (res.data == "successfully") {
            window.location.replace("AllNotes");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <div className="h-screen">
      {load ? (
        <div className="h-full grid grid-cols-6 bg-[#EFEADE]">
          <NavigationBar />
          <div className="col-span-6 lg:col-span-5 mr-10 ml-10 px-4 h-full">
            <NavFile
              status={localStorage.getItem("incom")}
              allstatus={localStorage.getItem("allstatus")}
            />
            <div
              className="rounded-lg h-[80%]"
              style={{ backgroundColor: "#FBF7F0" }}
            >
              <div className="h-[4rem] flex justify-between pt-8 pl-8 pr-10 items-center">
                <p className="text-2xl" style={{ fontFamily: "jockey" }}>
                  My Notes
                </p>
                <p
                  onClick={() => {
                    PushNote();
                  }}
                  className="px-8 bg-[#F08D6E]  text-white text-md rounded-sm"
                >
                  DONE
                </p>
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
                          {indexNote.index + 1 < 10
                            ? "0" + (indexNote.index + 1)
                            : indexNote.index + 1}
                        </p>

                        <input
                          onChange={(e) => {
                            setTopic(e.target.value);
                          }}
                          className="w-96 outline-none bg-[#FBF7F0] "
                          style={{ fontFamily: "jura" }}
                          placeholder="Enter your topic here"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className=" w-full items-center px-6 py-4 "
                    style={{ borderColor: "#D9DADA" }}
                  >
                    <div className="p-2 space-y-5">
                      <textarea
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                        className="w-full h-48 bg-[#FBF7F0] outline-none resize-none"
                        style={{ fontFamily: "jura", color: "#00213F" }}
                        placeholder="Enter your note here"
                      ></textarea>

                      <p
                        className="pt-2"
                        style={{ color: "#B5B7B9", fontFamily: "jura" }}
                      >
                        {moment(date).format("LL")}
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
