import axios from "axios";

const deleteUserData = async (id: string) => {
  try {
    const response = await axios.delete(`api/users/user-data/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export default deleteUserData;
