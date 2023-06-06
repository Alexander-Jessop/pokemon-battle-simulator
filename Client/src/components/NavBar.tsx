import React from "react";
import NavBarDiamond from "./Buttons/NavBarDiamond";

const routes = [
  { path: "/", name: "Landing Page" },
  { path: "/pokemon-selection", name: "Select Pokemon" },
  { path: "/battle", name: "Battle Simulator" },
];

const NavBar = () => {
  return (
    <div className="bg-gray-500">
      <nav>
        <ul className="flex space-x-4">
          {routes.map((route, index) => (
            <li key={index}>
              <NavBarDiamond path={route.path} name={route.name} />
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
