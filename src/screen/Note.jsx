import React, { useEffect, useState } from "react";
import NavigationBar from "../component/NavigationBar";
import Delete from "../assets/delete.svg";
import "../fonts/Jura/static/Jura-Bold.ttf";
import "../fonts/Jockey_One/JockeyOne-Regular.ttf";
import "../fonts/Kumbh_Sans/static/KumbhSans-Regular.ttf";
import "../fonts/JetBrains_Mono/JetBrainsMono-VariableFont_wght.ttf";
import { useLocation } from "react-router-dom";
import axios from "axios";
import path from "../../path";
import Loading from "../component/Loading";
import NavFile from "../component/NavFile";
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

  if (myNote == null) {
    window.location.replace("/AllNotes");
  }
  function UpdateNote() {
    axios
      .post(`${path}/updatenote`, {
        id: localStorage.getItem("id"),
        index: myNote.index,
        note: {
          topic: topic,
          description: description,
        },
      })
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
  function DeleteNote() {
    axios
      .post(`${path}/deletenote`, {
        id: localStorage.getItem("id"),
        index: myNote.index,
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
            <NavFile status={localStorage.getItem('incom')} allstatus={localStorage.getItem('allstatus')} />

            {/* Note */}
            <div
              className=" rounded-xl h-[80%] p-8 space-y-5 "
              style={{ backgroundColor: "#FBF7F0" }}
            >
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
                          DeleteNote();
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
