import React from "react";
import NavigationBar from "../component/NavigationBar";
import Notification from "../assets/notification.svg";
import Profile from "../assets/profile.svg";
import Delete from "../assets/delete.svg"
import "../fonts/Jura/static/Jura-Bold.ttf"
import "../fonts/Jockey_One/JockeyOne-Regular.ttf";
import "../fonts/Kumbh_Sans/static/KumbhSans-Regular.ttf";
import "../fonts/JetBrains_Mono/JetBrainsMono-VariableFont_wght.ttf";

function Note(){
    return(
        <div className="selcet-none" style={{ backgroundColor: "#EFEADE" }}>
      <div
        className="grid grid-cols-5 gap-4 min-h-screen pr-6"
        style={{ backgroundColor: "#EFEADE" }}
      >
        {/* Navigation */}
        <NavigationBar />

        <div className="col-span-3 px-2 pt-6">
          <div className="flex justify-between items-center">
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

          {/* Note */}
          <div
            className="mt-6 rounded-xl pt-8 px-8 pb-6 h-[85.5vh]"
            style={{ backgroundColor: "#FBF7F0" }}>
            <div className="text-xl flex justify-between items-center px-6 py-2">
                <p className="text-2xl" style={{ fontFamily: "jockey" }}>
                My Note
            </p>
            <button className="rounded w-20 " style={{backgroundColor: "#F08D6E", color: "#FBF7F0"}}>EDIT</button>
            </div>
            {/* textarea */}
            <div className="border" style={{ borderColor: "#D9DADA" }}>
           
                <div className="w-full mt-2 border-b-2" >
                <div className="text-xl flex justify-between items-center px-6 py-2">
                <div>
                <p className="text-6xl" style={{ color: "#B5B7B9", fontFamily: "jura" }}>
                01
                </p>
                <p style={{fontFamily: "jura"}}>Enter your topic here</p>
                </div>
            <img className="w-9" src={Delete} alt="" />
            </div>
                </div>
                <div className=" w-full flex justify-between items-center px-6 py-2 " style={{ borderColor: "#D9DADA" }}>
                 <div>
                 <p style={{fontFamily: "jura", color: "#00213F"}}>Enter Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic exercitationem aliquid quis? Consequuntur aspernatur voluptatem deleniti, inventore, ullam quod mollitia consequatur nemo ab facilis, voluptate tenetur excepturi sed voluptas rem. </p>
                
                    <p style={{color: '#B5B7B9', fontFamily: 'jura'}}>33124</p>
                </div>
                </div>
               
            </div>
            </div>
        </div>
      </div>
    </div>
    )
}

export default Note;