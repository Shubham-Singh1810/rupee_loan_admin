import axios from "axios";
import { BASE_URL } from "../../src/utils/api_base_url_configration";

const getConfig = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: token ? `Bearer ${JSON.parse(token)}` : "",
    },
  };
};

export const getSystemConfigrationDetailsServ = async () => {
  try {
    const response = await axios.get(BASE_URL + "system-configration/details", getConfig());
    return response;
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error("Error fetching data:", error);
    throw error;
  }
};
export const updateSystemConfigrationDetailsServ = async (formData) => {
  try {
    const response = await axios.put(BASE_URL + "system-configration/update-details", formData, getConfig());
    return response;
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error("Error fetching data:", error);
    throw error;
  }
};


