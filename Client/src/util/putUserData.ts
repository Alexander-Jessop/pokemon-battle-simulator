import axios from "axios";

const putUserData = async (id: string, data: object) => {
  try {
    const response = await axios.put(`api/users/user-data/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export default putUserData;
