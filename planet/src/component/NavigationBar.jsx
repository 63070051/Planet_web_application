import React from "react";
import DashBoard from "../assets/dashboard.svg";
import Account from "../assets/account.svg";
import Notes from "../assets/notes.svg";
import Setting from "../assets/setting.svg";
import Todo from "../assets/todo.svg";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import H_bg from "../assets/hamburger_bg.png";
const LinkTo = [
  {
    link: "/Dashboard",
    src: DashBoard,
    text: "DASHBOARD",
  },
  {
    link: "/Todo",
    src: Todo,
    text: "TO DO LIST",
  },
  {
    link: "/Note",
    src: Notes,
    text: "NOTES",
  },
  {
    link: "/Accounts",
    src: Account,
    text: "Account",
  },
  {
    link: "/Setting",
    src: Setting,
    text: "Setting",
  },
];

function LinkNav(props) {
  return (
    <div className="duration-500 hover:bg-[#FFAA9B]  rounded-lg w-full">
      <div className="flex justify-center items-center">
        <Link
          className="w-full px-4 py-2"
          to={props.obj.link}
          style={{ display: "flex", alignItems: "center" }}
        >
          <img className="ml-12 mr-0 w-8" src={props.obj.src} alt="" />{" "}
          <p className="text-center ml-4">{props.obj.text}</p>
        </Link>
      </div>
    </div>
  );
}

function NavigationBar() {
  return (
    <div style={{ backgroundColor: "#FBF7F0" }} className="col-span-1 hidden lg:block">
      <div
        className="space-x-4 p-10"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "jockey",
        }}
      >
        <img className="w-12" src={Logo} alt="" />
        <p className="text-2xl">Planet</p>
      </div>
      <div
        className="w-full"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div
          className="space-y-4 text-lg w-full"
          style={{ fontFamily: "jockey" }}
        >
          {LinkTo.map(function (object, i) {
            return <LinkNav obj={object} key={i} />;
          })}
        </div>
        <img className="absolute bottom-0 left-0 w-40" src={H_bg} alt="" />
      </div>
    </div>
  );
}
export default NavigationBar;
