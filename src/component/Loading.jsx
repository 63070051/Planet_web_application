import React, { useEffect, useState } from "react";
import Logo from "../assets/logo.svg";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import RadialSeparators from "./RadialSeparators";
import "../fonts/Jockey_One/JockeyOne-Regular.ttf";
import "../fonts/Kumbh_Sans/static/KumbhSans-Regular.ttf";
import "../fonts/JetBrains_Mono/JetBrainsMono-VariableFont_wght.ttf";

function Loading({percent}) {
  return (
    <div className="h-screen flex justify-center items-center bg-[#FBF7F0]">
      <div className="space-y-2">
        {/* <CircularProgressbarWithChildren value={66}>
        </CircularProgressbarWithChildren> */}
        <CircularProgressbarWithChildren
          value={percent}
          strokeWidth={10}
          styles={buildStyles({
            strokeLinecap: "butt",
            pathColor: "#FFAA9B",
            trailColor: "#75C9A8",
          })}
        >
          <RadialSeparators
            count={12}
            style={{
              background: "#fff",
              width: "2px",
              // This needs to be equal to props.strokeWidth
              height: `${10}%`,
            }}
          />
          <img style={{ width: 120, marginTop: -5 }} src={Logo} alt="logo" />
          <div style={{ fontSize: 24, marginTop: -5 }}>
            <p className="text-4xl" style={{fontFamily : "jura"}}>{percent}%</p>
          </div>
        </CircularProgressbarWithChildren>
      </div>
    </div>
  );
}
export default Loading;
