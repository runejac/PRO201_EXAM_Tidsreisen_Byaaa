import React, { useState } from "react";
import { Link } from "react-router-dom";
import { NavbarData } from "./navbarData.jsx";
import "../css/navbar.css";

export function Navbar() {
  const [clickedIconColor, setClickedIconColor] = useState({
    id: null,
  });

  // if icon clicked, matches with id, use css rule and filler icon
  function clickedIconNavbarHandler(itemId) {
    setClickedIconColor({
      id: itemId,
    });
  }

  return (
    <header style={{ position: "fixed", zIndex: "20", width: "100%" }}>
      <div id={"navbar-container"}>
        <div className={"navbar"}>
          <nav className={"nav-menu"}>
            <ul className={"nav-menu-items"}>
              {NavbarData.map((item, index) => {
                return (
                  <div key={index}>
                    <li>
                      <Link
                        onClick={() => clickedIconNavbarHandler(item.id)}
                        id={item.id}
                        style={
                          item.id === clickedIconColor.id
                            ? { color: "#000000", opacity: "1" }
                            : { color: "#000000", opacity: "0.6" }
                        }
                        className={"icon-and-title"}
                        to={item.path}
                      >
                        {item.id === clickedIconColor.id
                          ? item.iconActive
                          : item.icon}
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  </div>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
