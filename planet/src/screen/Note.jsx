import React from "react";
import NavigationBar from "../component/NavigationBar";
import Notification from "../assets/notification.svg";
import Profile from "../assets/profile.svg";
import Logo from "../assets/logo.svg";
import Plus from "../assets/plus.svg";
import Delete from "../assets/delete.svg"
import Minus from "../assets/minus.svg";
import H_bg from "../assets/hamburger_bg.png";
import Hamberger from "../component/Hamburger";
import DonutChart from "../component/DonutChart";
import "../fonts/Jockey_One/JockeyOne-Regular.ttf";
import "../fonts/Kumbh_Sans/static/KumbhSans-Regular.ttf";
import "../fonts/JetBrains_Mono/JetBrainsMono-VariableFont_wght.ttf";
import RightBackground from "../assets/TodoRightBackground.png";
import Edit from "../assets/edit.png";

function Note() {
  return (
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
            <button class="rounded w-20 " style={{backgroundColor: "#F08D6E", color: "#FBF7F0"}}>EDIT</button>
            </div>
            {/* textarea */}
            <div className="border" style={{ borderColor: "#D9DADA" }}>
           
                <div className="w-full mt-2 border-b-2" >
                <div className="text-xl flex justify-between items-center px-6 py-2">
                <div>
                <p className="text-2xl" style={{ fontFamily: "jockey" }}>
                01
                </p>
                <p>Enter your topic here</p>
                </div>
            <img className="w-9" src={Delete} alt="" />
            </div>
                </div>
                <div className=" w-full flex justify-between items-center px-6 py-2 " style={{ borderColor: "#D9DADA" }}>
                    <p>Enter Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic exercitationem aliquid quis? Consequuntur aspernatur voluptatem deleniti, inventore, ullam quod mollitia consequatur nemo ab facilis, voluptate tenetur excepturi sed voluptas rem. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste molestiae voluptatem ratione enim excepturi perferendis autem repellendus itaque voluptate esse sed explicabo veritatis tempora odio, exercitationem ad expedita debitis quidem sint tenetur, consequuntur adipisci iusto! Quos totam accusamus, quidem at hic enim vitae dolores iure corrupti reprehenderit ratione delectus eius eaque corporis impedit adipisci. Atque esse amet ipsum repellat ipsam, in cupiditate minus quas nihil reiciendis tenetur provident soluta ratione voluptas delectus aut laborum culpa quibusdam nesciunt, qui, a aliquid iure commodi? Incidunt laborum ipsam qui ea soluta nisi eos ad deserunt consectetur at aspernatur, rem voluptatibus dolor! Ab incidunt quis eveniet hic voluptas modi laborum dolor blanditiis ipsa facilis, libero corporis autem saepe eum, iusto explicabo quasi minima. Nam quo dolorem non vitae, minus, consectetur debitis modi, sit eligendi ducimus accusamus at illo? Aperiam aut similique repellat natus tempore corrupti necessitatibus quaerat? Quaerat quos doloremque ipsa adipisci hic! Obcaecati non est error eos fugit harum odio incidunt laboriosam omnis.</p>
                </div>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Note;
