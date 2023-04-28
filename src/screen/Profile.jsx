import React, { useEffect, useState } from "react";
import NavigationBar from "../component/NavigationBar";
import User from "../assets/profile.svg";
import axios from "axios";
import path from "../../path";
import md5 from "md5";
import Loading from "../component/Loading";
import { Buffer } from "buffer";

export default function Profile() {
  const [user, setUser] = useState();
  const [edit, setEdit] = useState(true);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const [logout, setLogout] = useState(true);
  const [load, setLoad] = useState(false);
  const [percent, setPercent] = useState(0);
  function Preview_Img(img) {
    if (img.length < 1) return;
    const newImageUrls = [];
    img.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setImageURLs(newImageUrls);
  }
  function onImageChange(e) {
    setImages([...e.target.files]);
    Preview_Img([...e.target.files]);
  }

  // console.log("Images : ", images);
  // console.log("imageURLs : ", imageURLs);

  function UpdateUser() {
    if (confirm("Are you sure update profile")) {
      if (images) {
        const file = images[0]; // the file object of the image
        const reader = new FileReader();
        let name = images[0].name;
        reader.readAsDataURL(file);
        reader.onload = () => {
          const base64Img = reader.result.split(",")[1];
          axios
            .put(`${path}/addprofileimage`, {
              id: localStorage.getItem("id"),
              image: base64Img,
              fileName: name,
            })
            .then((res) => {
              console.log(res.data);
            })
            .catch((err) => console.log(err));
        };
      }
      let c_password;
      if (password == "" || password == user.password) {
        c_password = user.password;
      } else {
        c_password = md5(password);
      }
      axios
        .post(`${path}/updateuser`, {
          id: user.id,
          firstname: firstname,
          lastname: lastname,
          password: c_password,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data == "successfully") {
            GetUser();
          }
        })
        .catch((err) => {
          console.log(err);
        });
      setEdit(true);
    } else {
    }
  }

  useEffect(() => {
    GetUser();
  }, []);
  function GetUser() {
    axios
      .post(`${path}/user`, { id: localStorage.getItem("id") })
      .then((res) => {
        if (res.data.image != "") {
          axios
            .post(
              `${path}/getprofile`,
              {
                path: res.data.image,
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
              const b64 = new Buffer(res.data.data).toString("base64");
              setImageURLs([`data:*/*;base64, ${b64}`]);
              setTimeout(() => {
                setLoad(true);
              }, 400);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          setTimeout(() => {
            setLoad(true);
          }, 400);
        }
        setUser(res.data);
        setFirstName(res.data.firstname);
        setLastName(res.data.lastname);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className="h-screen">
      {load ? (
        <div className="h-full grid grid-cols-5 bg-[#EFEADE]">
          <NavigationBar />
          <div className="col-span-4 px-4 h-full flex justify-center items-center">
            <div className="flex flex-col justify-center items-center bg-[#FBF7F0] w-[98%] h-[95%] rounded-xl">
              <p
                className="text-3xl mb-5 text-[#00213F]"
                style={{ fontFamily: "jockey" }}
              >
                Profile
              </p>
              {!edit && (
                <input
                  type="file"
                  className="hidden"
                  multiple
                  id="file-img"
                  onChange={onImageChange}
                />
              )}
              <label htmlFor="file-img">
                {imageURLs.length ? (
                  imageURLs.map((imageSrc, idx) => {
                    return (
                      <img
                        className="rounded-full h-[150px] w-[150px] object-cover"
                        key={idx}
                        src={imageSrc}
                      />
                    );
                  })
                ) : (
                  <img src={User} width={150} alt="" />
                )}
              </label>
              {user && (
                <div className="space-y-8 w-72">
                  <div className="space-y-3">
                    <div>
                      <label
                        className="block text-gray-400 text-sm mb-2"
                        htmlFor="username"
                      >
                        Firstname
                      </label>
                      <input
                        disabled={edit}
                        defaultValue={user.firstname}
                        className="shadow bg-[#FBF7F0] border-[#8A97A0] appearance-none border rounded-sm w-full py-2 px-3 text-[#B5B7B9] leading-tight focus:outline-none focus:shadow-outline"
                        id="firstname"
                        type="text"
                        onChange={(e) => {
                          setFirstName(e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <label
                        className="block bg-[#FBF7F0] border-[#8A97A0] text-gray-400 text-sm mb-2"
                        htmlFor="username"
                      >
                        Lastname
                      </label>
                      <input
                        disabled={edit}
                        defaultValue={user.lastname}
                        className="shadow bg-[#FBF7F0] border-[#8A97A0] appearance-none border rounded-sm w-full py-2 px-3  text-[#B5B7B9] leading-tight focus:outline-none focus:shadow-outline"
                        id="lastname"
                        type="text"
                        onChange={(e) => {
                          setLastName(e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <label
                        className="block  text-gray-400 text-sm mb-2"
                        htmlFor="username"
                      >
                        Password
                      </label>
                      <input
                        disabled={edit}
                        defaultValue={user.password}
                        className="shadow bg-[#FBF7F0] border-[#8A97A0] appearance-none border rounded-sm w-full py-2 px-3 text-[#B5B7B9] leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                    </div>
                    <div className="space-y-4">
                      {edit && (
                        <button
                          onClick={() => {
                            setEdit(!edit);
                            setLogout(false);
                          }}
                          className="text-sm px-4 py-1 w-full rounded-sm mt-3 border-[#146C94] border-2 text-[#146C94]"
                        >
                          EDIT
                        </button>
                      )}
                      {logout && (
                        <button
                          onClick={() => {
                            if (confirm("Are you sure Logout")) {
                              localStorage.removeItem("id");
                              window.location.replace("/");
                            }
                          }}
                          className="logout text-sm px-4 py-1 w-full rounded-sm mt-3 text-white  bg-[#F08D6E]"
                        >
                          LOGOUT
                        </button>
                      )}
                      {!edit && (
                        <div className="grid grid-cols-2 gap-4">
                          <button
                            onClick={() => {
                              setEdit(!edit);
                              setFirstName(user.firstname);
                              setLastName(user.lastname);
                              setPassword(user.password);
                              setLogout(true);
                              setImageURLs([]);
                              setImages([]);
                            }}
                            className="text-sm px-4 py-1 w-full rounded-sm mt-3 border-[#F08D6E] border-2 text-[#F08D6E]"
                          >
                            CANCEL
                          </button>
                          <button
                            onClick={() => {
                              setLogout(true);
                              UpdateUser();
                            }}
                            className="text-sm px-4 py-1 w-full rounded-sm mt-3 border-[#569DAA] border-2 text-[#569DAA]"
                          >
                            CONFIRM
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Loading percent={percent} />
      )}
    </div>
  );
}
