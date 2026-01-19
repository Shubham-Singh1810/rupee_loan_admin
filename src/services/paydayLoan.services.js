import axios from "axios";

import { BASE_URL } from "../utils/api_base_url_configration";

const getConfig = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: token ? `Bearer ${JSON.parse(token)}` : "",
    },
  };
};

export const getPaydayLoanDetailsServ = async () => {
  try {
    const response = await axios.get(BASE_URL + "payday-loan/details", getConfig());
    return response;
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const updatePaydayLoanServ = async (formData) => {
  try {
    const response = await axios.put(BASE_URL + "payday-loan/update", formData, getConfig());
    return response;
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error("Error fetching data:", error);
    throw error;
  }
};

