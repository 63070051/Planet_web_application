import React, { useState, useContext, useEffect, useRef } from "react";
import Hamberger from "../component/Hamburger";
import DonutChart from "../component/DonutChart";
import "../fonts/Jockey_One/JockeyOne-Regular.ttf";
import "../fonts/Kumbh_Sans/static/KumbhSans-Regular.ttf";
import "../fonts/JetBrains_Mono/JetBrainsMono-VariableFont_wght.ttf";
import RightBackground from "../assets/TodoRightBackground.png";
import Logo from "../assets/logo.svg";
import Plus from "../assets/plus.svg";
import Minus from "../assets/minus.svg";
import NavigationBar from "../component/NavigationBar";
import Notification from "../assets/notification.svg";
import Profile from "../assets/profile.svg";
import H_bg from "../assets/hamburger_bg.png";
import { useHorizontalScroll } from "../component/UseHorizontal";

import moment from "moment";
import axios from "axios";
import path from "../../path";

const MONTH = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

const DAY = [
  {
    daynum: "1",
  },
  {
    daynum: "2",
  },
  {
    daynum: "3",
  },
  {
    daynum: "4",
  },
  {
    daynum: "5",
  },
  {
    daynum: "6",
  },
  {
    daynum: "7",
  },
  {
    daynum: "8",
  },
  {
    daynum: "9",
  },
  {
    daynum: "10",
  },
  {
    daynum: "11",
  },
  {
    daynum: "12",
  },
  {
    daynum: "13",
  },
  {
    daynum: "14",
  },
  {
    daynum: "15",
  },
  {
    daynum: "16",
  },
  {
    daynum: "17",
  },
  {
    daynum: "18",
  },

  {
    daynum: "19",
  },
  {
    daynum: "20",
  },
  {
    daynum: "21",
  },
  {
    daynum: "22",
  },
  {
    daynum: "23",
  },
  {
    daynum: "24",
  },
  {
    daynum: "25",
  },
  {
    daynum: "26",
  },
  {
    daynum: "27",
  },
  {
    daynum: "28",
  },
  {
    daynum: "29",
  },
  {
    daynum: "30",
  },
  {
    daynum: "31",
  },
];

const DATACHECKBOX = [
  "Send email to meaw.",
  "Clean the room.",
  "Order new dress.",
  "manager",
  "manager",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
  "Call manager.",
];

function CheckBox(props) {
  const [index, setIndex] = useState(props.index);
  const [checked, setChecked] = useState(false);
  return (
    <div className="border-t flex justify-between items-center px-6 py-3">
      <div
        className="flex space-x-4 items-center"
        onClick={() => {
          setChecked(!checked);
        }}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={() => {}}
          className="w-4 h-4 border-gray-300 rounded accent-[#FFAA9B]"
        />
        <p style={{ fontFamily: "jura" }}>{props.text}</p>
      </div>
      <img src={Minus} alt="" />
    </div>
  );
}

function TodoList() {
  const [focus, setFocus] = useState(new Date().getDate());
  const [focusMonth, setFocusMonth] = useState(MONTH[new Date().getMonth()]);
  const [focusDay, setFocusDay] = useState(
    new Date().toLocaleString("en-us", { weekday: "long" })
  );
  const [focusCalendar, setFocusCalendar] = useState();
  const [allCalendar, setAllCalendar] = useState();
  const scrollRef = useHorizontalScroll();

  useEffect(() => {
    axios
      .post(`${path}/calendar`, { id: localStorage.getItem("id") })
      .then((res) => {
        setAllCalendar(res.data);
        res.data.forEach((value) => {
          if (Object.keys(value)[0] == focusMonth) {
            setFocusCalendar(value[focusMonth]);
          }
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  function DayComponent(props) {
    return (
      <div
        className="rounded-full border py-2 w-10 my-2 cursor-pointer"
        style={{
          borderColor: props.bg,
          backgroundColor: props.bg,
          fontFamily: "jura",
        }}
        onClick={() => {
          setFocus(props.day);
          setFocusDay(props.days.toUpperCase());
        }}
      >
        <p className="text-center text-xl" style={{ color: props.color }}>
          {props.day}
        </p>
        <p
          className="text-xs text-center font-bold"
          style={{ color: props.color }}
        >
          {props.days.toUpperCase().slice(0, 3)}
        </p>
      </div>
    );
  }

  function Body() {
    return (
      <div className="col-span-3 px-2 pt-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-2xl" style={{ fontFamily: "jockey" }}>
              Welcome back, Kwanpf
            </p>
            <p className="text-xl" style={{ fontFamily: "Kumbh_Sans_Regular" }}>
              What’s Up Today?
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <img className="w-10" src={Notification} alt="" />
            <img className="w-10" src={Profile} alt="" />
          </div>
        </div>
        <div
          className="mt-6 rounded-xl pt-8 px-8 pb-6 h-[85.5vh]"
          style={{ backgroundColor: "#FBF7F0" }}
        >
          <div className="flex items-center justify-between">
            <p className="text-2xl" style={{ fontFamily: "jockey" }}>
              TO DO LIST
            </p>
            <div className="relative">
              <select
                defaultValue={focusMonth}
                onChange={(e) => {
                  allCalendar.forEach((value) => {
                    if (Object.keys(value)[0] == e.target.value) {
                      setFocusCalendar(value[e.target.value]);
                      setFocusMonth(e.target.value)
                      setFocusDay(((value[e.target.value])[focus-1][focus]).day.toUpperCase())
                    }
                  });
                }}
                className="w-40 p-2.5 text-gray-500 text-center bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
              >
                <option value="January">January</option>
                <option value="Febuary">Febuary</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
            </div>
          </div>
          <div className="relative flex items-center">
            <div
              className="grid grid-flow-col auto-cols-max gap-2 overflow-x-scroll "
              ref={scrollRef}
            >
              {focusCalendar &&
                focusCalendar.map((value, index) => {
                  return index + 1 == focus ? (
                    <DayComponent
                      day={index + 1}
                      days={value[focus].day}
                      color={"white"}
                      bg={"#FFAA9B"}
                      key={index}
                    />
                  ) : (
                    <DayComponent
                      day={index + 1}
                      days={value[index + 1].day}
                      color={"#B5B7B9"}
                      bg={"FBF7F0"}
                      key={index}
                    />
                  );
                })}
            </div>
          </div>
          <div
            className="w-full mt-10 border rounded-lg"
            style={{ borderColor: "#D9DADA" }}
          >
            <div className="text-xl flex justify-between items-center px-6 py-2">
              <p style={{ fontFamily: "jockey" }}>
                {focus} {focusDay}
              </p>
              <img className="w-6" src={Plus} alt="" />
            </div>
            <div className="overflow-y-auto h-[55vh]">
              {DATACHECKBOX.map((value, index) => {
                return <CheckBox text={value} key={index} index={index} />;
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="select-none">
      {/* // Body Grid */}
      <div
        className="grid grid-cols-5 gap-4 min-h-screen pr-6"
        style={{ backgroundColor: "#EFEADE" }}
      >
        {/* // Navigation Bar */}
        <NavigationBar />
        {/* // Todo Body */}
        <Body />
        {/* //Task Status */}
        <div
          style={{ backgroundColor: "#FBF7F0" }}
          className="rounded-xl mt-6 mb-6 col-span-1"
        >
          <div className="flex justify-end">
            <img className="w-4/5" src={RightBackground} alt="" />
          </div>
          <div className="text-center">
            <p
              className="text-7xl mt-12"
              style={{ color: "#75C9A8", fontFamily: "jockey" }}
            >
              43%
            </p>
            <p
              className="text-xl"
              style={{ color: "#B5B7B9", fontFamily: "jockey" }}
            >
              Completed Tasks
            </p>
            <div className="mt-16 lg:mt-12 xl:mt-8 px-4 mx-auto relative">
              <img
                className="absolute w-10 right-0 bottom-0 left-0 top-0 m-auto"
                src={Plus}
                alt=""
              />
              <DonutChart />
            </div>
            <div className="px-6">
              <button
                className="w-full py-1 border text-sm rounded mt-8"
                style={{
                  fontFamily: "jockey",
                  borderColor: "#768592",
                  color: "#858585",
                }}
              >
                View your tasks
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
