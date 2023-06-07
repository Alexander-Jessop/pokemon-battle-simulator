import { Link } from "react-router-dom";

interface NavBarButtonProps {
  path: string;
  name: string;
  className?: string;
}

const NavBarButton = ({ path, name, className }: NavBarButtonProps) => {
  return (
    <Link to={path} className={className}>
      {name}
    </Link>
  );
};

export default NavBarButton;
