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

function Note() {
  const [edit, setEdit] = useState(false);
  const [deleteNote, setDeletenote] = useState(false);
  const location = useLocation();
  const myNote = location.state;
  const [description, setDescription] = useState();
  const [topic, setTopic] = useState();
  const [user, setUser] = useState();
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
  useEffect(() => {
    axios
      .post(
        "https://2a4ce4nw26.execute-api.us-east-1.amazonaws.com/Dev/getnote",
        {
          id: localStorage.getItem("id"),
          index: myNote.index,
        }
      )
      .then((res) => {
        setDescription(res.data.description);
        setTopic(res.data.topic);
      })
      .catch((err) => {
        console.log(err);
      });
    GetUser();
  }, []);
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
  return (
    <div className="selcet-none" style={{ backgroundColor: "#EFEADE" }}>
      <div
        className="grid grid-cols-5 gap-4 min-h-screen pr-6"
        style={{ backgroundColor: "#EFEADE" }}
      >
        {/* Navigation */}
        <NavigationBar />

        <div className="col-span-4 px-2 pt-6">
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

          {/* Note */}
          <div
            className="mt-6 rounded-xl pt-8 px-8 pb-6 h-[85.5vh]"
            style={{ backgroundColor: "#FBF7F0" }}
          >
            <div className="text-xl flex justify-between items-center px-6 py-2">
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
                className="rounded w-20 "
                style={{ backgroundColor: "#F08D6E", color: "#FBF7F0" }}
              >
                {edit ? "UPDATE" : "EDIT"}
              </button>
            </div>
            {/* textarea */}
            <div className="border" style={{ borderColor: "#D9DADA" }}>
              <div className="w-full mt-2 border-b-2">
                <div className="text-xl flex justify-between items-center px-6 py-2">
                  <div>
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
                        style={{ fontFamily: "jura" }}
                        defaultValue={topic}
                        onChange={(e) => {
                          setTopic(e.target.value);
                        }}
                      />
                    ) : (
                      <p style={{ fontFamily: "jura" }}>{topic}</p>
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
                className=" w-full    items-center px-6 py-2 "
                style={{ borderColor: "#D9DADA" }}
              >
                <div>
                  {edit ? (
                    <textarea
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                      defaultValue={description}
                      className="w-full h-[300px] bg-[#FBF7F0]"
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
                    33124
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Note;
