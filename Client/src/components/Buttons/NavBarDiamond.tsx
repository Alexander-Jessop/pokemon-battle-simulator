import React from "react";
import { Link } from "react-router-dom";

interface NavBarButtonProps {
  path: string;
  name: string;
  style?: React.CSSProperties;
}

const NavBarButton: React.FC<NavBarButtonProps> = ({ path, name, style }) => {
  return (
    <Link to={path} style={style}>
      {name}
    </Link>
  );
};

export default NavBarButton;
