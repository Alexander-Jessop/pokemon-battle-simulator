import React from "react";
import { Link } from "react-router-dom";

interface NavBarButtonProps {
  path: string;
  name: string;
  className?: string;
}

const NavBarButton: React.FC<NavBarButtonProps> = ({
  path,
  name,
  className,
}) => {
  return (
    <Link to={path} className={className}>
      {name}
    </Link>
  );
};

export default NavBarButton;
