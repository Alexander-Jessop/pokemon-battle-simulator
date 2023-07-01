import axios from "axios";

const fetchUserData = async (userId: string) => {
  try {
    const res = await axios.get(`/api/users/user-data/${userId}`);
    return res.data;
  } catch (err) {
    throw new Error("Failed to fetch user data");
  }
};

export default fetchUserData;
