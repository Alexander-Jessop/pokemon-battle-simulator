import { useLocation } from "react-router-dom";
import NavBarDiamond from "./Buttons/NavBarLink";

const routes = [
  { path: "/", name: "Home" },
  { path: "/pokemon-selection", name: "Select Pokemon" },
  { path: "/battle", name: "Pokemon Stadium" },
  { path: "/singup", name: "Sign Up" },
];

const NavBar = () => {
  const location = useLocation();

  return (
    <div
      className="mx-auto flex items-center justify-center
        bg-secondary-800 p-6 text-primary-50"
    >
      <nav>
        <div className="flex justify-between">
          <ul className="flex space-x-4">
            {routes.map((route, index) => (
              <li key={index}>
                <NavBarDiamond
                  path={route.path}
                  name={route.name.toUpperCase()}
                  className={`mx-1.5 ${
                    location.pathname === route.path
                      ? "border-b-2 border-tertiary-400"
                      : "border-b-2border-transparent hover:border-tertiary-400"
                  } sm:mx-6`}
                />
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
