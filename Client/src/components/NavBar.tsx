import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import NavBarLink from "./Buttons/NavBarLink";
import { useSelectedTeam } from "../hooks/useSelectedTeam";
import { useEffect, useState } from "react";

const NavBar = () => {
  const USER_LOGOUT_API = "api/users/logout";
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedTeam } = useSelectedTeam();
  const [showStadiumButton, setShowStadiumButton] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const routes = [
    { path: "/pokemon-selection", name: "Select Pokemon" },
    // { path: "/pokemon-adventure", name: "Adventure Time" },
    // { path: "/pokemon-vs-mode", name: "Versus Arena" },
  ];

  const handleLogout = async () => {
    try {
      await axios.post(USER_LOGOUT_API);
      localStorage.removeItem("userSession");
      navigate("/login");
    } catch (error) {
      throw new Error("Logout failed. Please try again.");
    }
  };

  useEffect(() => {
    selectedTeam.length === 6
      ? setShowStadiumButton(true)
      : setShowStadiumButton(false);
  }, [selectedTeam]);

  useEffect(() => {
    const userSession = localStorage.getItem("userSession");
    userSession ? setIsUserLoggedIn(true) : setIsUserLoggedIn(false);
  }, [location]);

  return (
    <nav
      className="mx-auto flex items-center justify-between bg-secondary-800
    p-6 text-primary-50"
    >
      <NavBarLink
        path="/"
        name="HOME"
        className={`mx-1.5 ${
          location.pathname === "/"
            ? "border-b-2 border-tertiary-400"
            : `border-b-2 border-transparent hover:border-tertiary-400`
        } sm:mx-6`}
      />
      <ul className="flex space-x-4">
        {routes.map((route, index) => (
          <li key={index}>
            <NavBarLink
              path={route.path}
              name={route.name.toUpperCase()}
              className={`mx-1.5 ${
                location.pathname === route.path
                  ? "border-b-2 border-tertiary-400"
                  : `border-b-2 border-transparent hover:border-tertiary-400`
              } sm:mx-6`}
            />
          </li>
        ))}
        {showStadiumButton && (
          <li>
            <NavBarLink
              path="/battle"
              name="POKEMON STADIUM"
              className={`mx-1.5 ${
                location.pathname === "/pokemon-stadium"
                  ? "border-b-2 border-tertiary-400"
                  : `border-b-2 border-transparent hover:border-tertiary-400`
              } sm:mx-6`}
            />
          </li>
        )}
      </ul>
      <div className="flex space-x-4">
        {!isUserLoggedIn && (
          <>
            <NavBarLink
              path="/login"
              name="LOGIN"
              className={`mx-1.5 ${
                location.pathname === "/login"
                  ? "border-b-2 border-tertiary-400"
                  : `border-b-2 border-transparent hover:border-tertiary-400`
              } sm:mx-6`}
            />
          </>
        )}
        {isUserLoggedIn && (
          <>
            <NavBarLink
              path="/profile"
              name="PROFILE"
              className={`mx-1.5 ${
                location.pathname === "/profile"
                  ? "border-b-2 border-tertiary-400"
                  : `border-b-2 border-transparent hover:border-tertiary-400`
              } sm:mx-6`}
            />
            <button
              onClick={handleLogout}
              className="mx-1.5 space-x-4 border-b-2 border-transparent
              hover:border-tertiary-400 sm:mx-6"
            >
              LOGOUT
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
