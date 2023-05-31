import React from "react";
import { Link, useLocation, useMatch } from "react-router-dom";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

export const NavLink: React.FC<NavLinkProps> = ({ to, children }) => {
  const match = useMatch(to);
  const location = useLocation();

  return (
    <>
      <Link
        className={`text-white ${match ? "bg-primary-400" : ""} ${
          location.pathname === to ? "font-bold" : ""
        }`}
        to={to}
      >
        {children}
      </Link>
    </>
  );
};
