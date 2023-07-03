import { useEffect, useState, useRef, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import Chart from "chart.js/auto";
import fetchUserData from "../util/fetchUserData";
import { IUserData } from "../types/ApiType";
import deleteUserData from "../util/deleteUserData";
import putUserData from "../util/putUserData";

const ProfilePage = () => {
  const navigate = useNavigate();
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const [userData, setUserData] = useState<IUserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const sessionString = localStorage.getItem("userSession");

      if (!sessionString) {
        navigate("/login");
        return;
      }

      try {
        const sessionData = JSON.parse(sessionString);
        const userId = sessionData._id;
        try {
          const data = await fetchUserData(userId);
          setUserData(data);
          createChart(data);
          setIsLoading(false);
          setFormValues({
            name: data.name,
            email: data.email,
            password: "",
          });
        } catch (error) {
          throw new Error("Failed to fetch user data.");
        }
      } catch (error) {
        throw new Error("Invalid session data.");
      }
    };

    fetchData();
  }, [navigate]);

  useEffect(() => {
    if (userData) {
      createChart(userData);
    }
  }, [userData]);

  const createChart = (data: IUserData) => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        new Chart(ctx, {
          type: "pie",
          data: {
            labels: ["Games Won", "Games Lost", "Games Abandoned"],
            datasets: [
              {
                label: "Games Played",
                data: [
                  data.gamesWon,
                  data.gamesLost,
                  data.battlesPlayed - (data.gamesWon + data.gamesLost),
                ],
                backgroundColor: [
                  "rgba(75, 192, 192, 0.8)",
                  "rgba(255, 99, 132, 0.8)",
                  "rgba(255, 206, 86, 0.8)",
                ],
                borderColor: [
                  "rgba(75, 192, 192, 1)",
                  "rgba(255, 99, 132, 1)",
                  "rgba(255, 206, 86, 0.8)",
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: "bottom",
              },
            },
          },
        });
      }
    }
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleDeleteProfile = async () => {
    const sessionString = localStorage.getItem("userSession");

    if (!sessionString) {
      navigate("/login");
      return;
    }

    try {
      const sessionData = JSON.parse(sessionString);
      const userId = sessionData._id;
      await deleteUserData(userId);
      localStorage.removeItem("userSession");
      navigate("/");
    } catch (error) {
      throw new Error("Failed to delete user data:", error as Error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    const sessionString = localStorage.getItem("userSession");

    if (!sessionString) {
      navigate("/login");
      return;
    }

    try {
      const sessionData = JSON.parse(sessionString);
      const userId = sessionData._id;
      await putUserData(userId, {
        name: formValues.name,
        email: formValues.email,
        password: formValues.password,
      });
      setIsEditing(false);
      setUserData((prevData) =>
        prevData
          ? { ...prevData, name: formValues.name, email: formValues.email }
          : null
      );
    } catch (error) {
      throw new Error("Failed to update user data:", error as Error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>No user data available.</div>;
  }

  return (
    <div
      className="flex h-screen flex-col items-center justify-center
    bg-primary-700"
    >
      <h1 className="text-3xl font-bold text-white">
        Pokemon Trainer: {userData.name}
      </h1>
      <div
        className="mt-4 flex flex-col items-start justify-between rounded-lg
      bg-primary-400 p-4 shadow-lg"
      >
        <div className="mb-4 flex">
          <div className="flex space-x-4">
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={formValues.name}
                  onChange={handleChange}
                  className="rounded bg-white px-2 py-1 text-lg"
                />
                <input
                  type="text"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                  className="rounded bg-white px-2 py-1 text-lg"
                />
                <input
                  type="text"
                  name="password"
                  placeholder="New Password"
                  onChange={handleChange}
                  className="rounded bg-white px-2 py-1 text-lg"
                />
              </>
            ) : (
              <>
                <p className="text-lg text-white">Name: {userData.name}</p>
                <p className="text-lg text-white">Email: {userData.email}</p>
              </>
            )}
          </div>
        </div>
        <div className="flex min-w-[300px] max-w-[500px] justify-center">
          <canvas
            ref={chartRef}
            width={400}
            height={400}
            className="rounded-lg"
          />
        </div>
        <p className="text-lg text-white">Visits: {userData.visits}</p>
        <p className="text-lg text-white">Moves Used: {userData.movesUsed}</p>
        <div className="flex w-full justify-center">
          <div className="flex space-x-8">
            <p className="text-lg text-white">
              Games Played: {userData.gamesWon + userData.gamesLost}
            </p>
            <p className="text-lg text-white">
              Games Abandon:{" "}
              {userData.battlesPlayed -
                (userData.gamesWon + userData.gamesLost)}
            </p>
          </div>
        </div>
        <div className="flex w-full justify-center">
          <div className="flex space-x-8">
            <p className="text-lg text-white">Games Won: {userData.gamesWon}</p>
            <p className="text-lg text-white">
              Games Lost: {userData.gamesLost}
            </p>
          </div>
        </div>

        <div className="flex w-full justify-end">
          {isEditing ? (
            <button
              className="mt-4 rounded bg-green-500 px-4 py-2 font-bold
              text-white hover:bg-green-400"
              onClick={handleSaveChanges}
            >
              Save Changes
            </button>
          ) : (
            <button
              className="mt-4 rounded bg-blue-500 px-4 py-2 font-bold
              text-white hover:bg-blue-400"
              onClick={handleEditProfile}
            >
              Edit Profile
            </button>
          )}

          <button
            className="ml-4 mt-4 rounded bg-red-500 px-4 py-2 font-bold
            text-white hover:bg-red-400"
            onClick={handleDeleteProfile}
          >
            Delete Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
