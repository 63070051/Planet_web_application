import React, { useState, useContext } from "react";
import { slide as Menu } from "react-burger-menu";
import Logo from "../assets/logo.svg";
import DashBoard from "../assets/dashboard.svg";
import Account from "../assets/account.svg";
import Notes from "../assets/notes.svg";
import Setting from "../assets/setting.svg";
import Todo from "../assets/todo.svg";
import H_bg from "../assets/hamburger_bg.png";
import { Link } from "react-router-dom";
import "../fonts/Jockey_One/JockeyOne-Regular.ttf";
import "../fonts/Kumbh_Sans/static/KumbhSans-Regular.ttf";
import "../fonts/JetBrains_Mono/JetBrainsMono-VariableFont_wght.ttf";

// make a new context

// create the provider

// default export here
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
    <div className="duration-500 hover:bg-red-500 px-4 py-2 rounded-lg w-full">
      <div className="flex justify-center items-center">
        <Link
          className="w-full"
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

const Hamburger = () => {
  const MyContext = React.createContext();
  const [menuOpenState, setMenuOpenState] = useState(false);
  const MyProvider = (props) => {
    return (
      <MyContext.Provider
        value={{
          isMenuOpen: menuOpenState,
          toggleMenu: () => setMenuOpenState(!menuOpenState),
          stateChangeHandler: (newState) => setMenuOpenState(newState.isOpen),
        }}
      >
        {props.children}
      </MyContext.Provider>
    );
  };

  // create a button that calls a context function to set a new open state when clicked
  const Button = () => {
    const ctx = useContext(MyContext);
    return <button onClick={ctx.toggleMenu}>Toggle menu</button>;
  };

  // create a navigation component that wraps the burger menu
  const Navigation = () => {
    const ctx = useContext(MyContext);

    return (
      <Menu
        customBurgerIcon={false}
        isOpen={ctx.isMenuOpen}
        onStateChange={(state) => ctx.stateChangeHandler(state)}
        width={280}
        styles={styles}
      >
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
      </Menu>
    );
  };
  return (
    <MyProvider>
      <div>
        <Navigation />
        {!menuOpenState ? <Button /> : null}
      </div>
    </MyProvider>
  );
};

var styles = {
  bmBurgerButton: {
    position: "fixed",
    width: "36px",
    height: "30px",
    left: "36px",
    top: "36px",
  },
  bmBurgerBars: {
    background: "#373a47",
  },
  bmBurgerBarsHover: {
    background: "#a90000",
  },
  bmCrossButton: {
    height: "24px",
    width: "24px",
  },
  bmCross: {
    background: "#bdc3c7",
  },
  bmMenuWrap: {
    position: "fixed",
    height: "100%",
  },
  bmMenu: {
    background: "#FBF7F0",
    // padding: "2.5em 1.5em 0",
    fontSize: "1.15em",
  },
  bmMorphShape: {
    fill: "#FBF7F0",
  },
  bmItemList: {
    color: "#00213F",
    padding: "0.8em",
  },
  bmItem: {
    // display: "inline-block",
  },
  bmOverlay: {
    background: "rgba(0, 0, 0, 0.3)",
  },
};

export default Hamburger;
