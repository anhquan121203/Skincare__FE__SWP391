// Settup axiosIntance

import axiosInstance from "./axiosInstance";
const API_BASE_URL = "https://localhost:7088";


export const loginUser = async (userData) => {
  try {
    const response = await axiosInstance.post(
      `${API_BASE_URL}/login`,
      userData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.Errors ||
      error.response?.data?.Message ||
      "An error occurred"
    );
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post(
      `${API_BASE_URL}/api/account/register`,
      userData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response;
  } catch (error) {
    throw (
      error.response?.data?.Errors ||
      error.response?.data?.Message ||
      "An error occurred"
  );
  }
};

export const signOut = async () => {
  try {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
  } catch (error) {
    console.error("Error logging out:", error);
  }
};
