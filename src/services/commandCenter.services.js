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
export const getAdminListServ = async (payload) => {
  try {
    const response = await axios.post(BASE_URL + "admin/list", payload, getConfig());
    return response;
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error("Error fetching data:", error);
    throw error;
  }
};
export const deleteAdminServ = async (id) => {
  try {
    const response = await axios.delete(BASE_URL + "admin/delete/"+id, getConfig());
    return response;
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error("Error fetching data:", error);
    throw error;
  }
};
export const getRoleListServ = async (payload) => {
  try {
    const response = await axios.post(BASE_URL + "role/list", payload, getConfig());
    return response;
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error("Error fetching data:", error);
    throw error;
  }
};
export const getRoleDetailServ = async (id) => {
  console.log(id)
  try {
    const response = await axios.get(BASE_URL + "role/details/"+id, getConfig());
    return response;
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error("Error fetching data:", error);
    throw error;
  }
};
export const addRoleServ = async (formData) => {
  try {
    const response = await axios.post(BASE_URL + "role/create", formData, getConfig());
    return response;
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error("Error fetching data:", error);
    throw error;
  }
};
export const updateRoleServ = async (formData) => {
  try {
    const response = await axios.put(BASE_URL + "role/update", formData, getConfig());
    return response;
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error("Error fetching data:", error);
    throw error;
  }
};
export const addAdminServ = async (formData) => {
  try {
    const response = await axios.post(BASE_URL + "admin/create", formData, getConfig());
    return response;
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error("Error fetching data:", error);
    throw error;
  }
};
export const updateAdminServ = async (formData) => {
  try {
    const response = await axios.put(BASE_URL + "admin/update", formData, getConfig());
    return response;
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error("Error fetching data:", error);
    throw error;
  }
};
export const getPermissionListServ = async (payload) => {
  try {
    const response = await axios.post(BASE_URL + "permission/list", payload, getConfig());
    return response;
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error("Error fetching data:", error);
    throw error;
  }
};
export const addPermissionServ = async (payload) => {
  try {
    const response = await axios.post(BASE_URL + "permission/create", payload, getConfig());
    return response;
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error("Error fetching data:", error);
    throw error;
  }
};
export const deletePermissionServ = async (id) => {
  try {
    const response = await axios.delete(BASE_URL + "permission/delete/"+id, getConfig());
    return response;
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error("Error fetching data:", error);
    throw error;
  }
};
export const updatePermissionServ = async (formData) => {
  try {
    const response = await axios.put(BASE_URL + "permission/update", formData, getConfig());
    return response;
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error("Error fetching data:", error);
    throw error;
  }
};
export const deleteRoleServ = async (id) => {
  try {
    const response = await axios.delete(BASE_URL + "role/delete/"+id,  getConfig());
    return response;
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error("Error fetching data:", error);
    throw error;
  }
};
export const getAdminProfileServ = async (id) => {
  try {
    const response = await axios.get(BASE_URL + "admin/details/"+id,  getConfig());
    return response;
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error("Error fetching data:", error);
    throw error;
  }
};
export const updatePasswordServ = async (formData) => {
  try {
    const response = await axios.put(BASE_URL + "admin/update-password", formData, getConfig());
    return response;
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error("Error fetching data:", error);
    throw error;
  }
};
export const globalSearchServ = async (formData) => {
  try {
    const response = await axios.post(BASE_URL + "admin/global-search", formData, getConfig());
    return response;
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error("Error fetching data:", error);
    throw error;
  }
};
