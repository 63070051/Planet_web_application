import React from "react";
import NavigationBar from "../component/NavigationBar";
import User from "../assets/profile.svg";
export default function Profile() {
  return (
    <div className="h-screen">
      <div className="h-full grid grid-cols-5 bg-[#EFEADE]">
        <NavigationBar />
        <div className="col-span-4 px-4 h-full flex justify-center items-center">
          <div className="flex flex-col justify-center items-center bg-[#FBF7F0] w-[98%] h-[95%] rounded-xl">
            <p className="text-3xl mb-5 text-[#00213F]" style={{fontFamily: "jockey"}}>Profile</p>
            <img src={User} width={100} alt="" />
            <div className="space-y-8 w-72">
              <div className="space-y-3">
                <div>
                  <label
                    className="block text-gray-400 text-sm mb-2"
                    htmlFor="username"
                  >
                    Full name
                  </label>
                  <input
                  disabled
                    className="shadow bg-[#FBF7F0] border-[#8A97A0] appearance-none border rounded-sm w-full py-2 px-3 text-[#B5B7B9] leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    // placeholder="Username"
                  />
                </div>
                <div>
                  <label
                    className="block bg-[#FBF7F0] border-[#8A97A0] text-gray-400 text-sm mb-2"
                    htmlFor="username"
                  >
                    Email
                  </label>
                  <input
                  disabled
                    className="shadow bg-[#FBF7F0] border-[#8A97A0] appearance-none border rounded-sm w-full py-2 px-3  text-[#B5B7B9] leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    // placeholder="Username"
                  />
                </div>
                <div>
                  <label
                    className="block  text-gray-400 text-sm mb-2"
                    htmlFor="username"
                  >
                    Phone number
                  </label>
                  <input
                  disabled
                    className="shadow bg-[#FBF7F0] border-[#8A97A0] appearance-none border rounded-sm w-full py-2 px-3 text-[#B5B7B9] leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    // placeholder="Username"
                  />
                </div>
                <div className="space-y-4">
                  <button
                  
                    className="text-sm px-4 py-1 w-full rounded-sm mt-3 border-[#F08D6E] border-2 text-[#F08D6E]" 
                  >
                    EDIT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
