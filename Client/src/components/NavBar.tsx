import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

interface NavItem {
  id: number;
  title: string;
  path: string;
}

const navItems: NavItem[] = [
  { id: 1, title: "HOME", path: "/" },
  { id: 2, title: "CHOOSE YOUR POKEMON", path: "/pokemon-selection" },

  //   { id: , title: "ABOUT", path: "/about" },
  //   { id: , title: "CONTACT", path: "/contact" },
];

interface NavBarProps {
  children: ReactNode;
}

const NavBar: React.FC<NavBarProps> = ({ children }) => {
  return (
    <nav>
      <ul>
        {navItems.map((item) => (
          <li key={item.id}>
            <Link to={item.path}>{item.title}</Link>
          </li>
        ))}
      </ul>
      {children}
    </nav>
  );
};

export default NavBar;
