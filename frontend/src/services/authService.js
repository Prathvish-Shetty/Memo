import axiosInstance from './axiosInstance.js'
import useAuthStore from '../store/useAuthStore.js'

export const signup = async (data) => {
  try {
    const response = await axiosInstance.post('/auth/signup', data);
    const { user, accessToken } = response.data
    useAuthStore.getState().login(accessToken, user);
  } catch (error) {
    console.error("Signup Error:", error);
    throw error.response?.data || { message: "Signup failed" };
  }
}

export const loginUser = async (data) => {
  try {
    const response = await axiosInstance.post('/auth/login', data);
    const { user, accessToken } = response.data
    useAuthStore.getState().login(accessToken, user);
  } catch (error) {
    console.error("Login Error:", error);
    throw error.response?.data || { message: "Login failed" };
  }
};

export const logoutUser = async () => {
  try {
    const response = await axiosInstance.post('/auth/logout');
    useAuthStore.getState().logout();
    return response.data;
  } catch (error) {
    console.error("Logout Error:", error);
    throw error.response?.data || { message: "Logout failed" };
  }
};

export const refreshToken = async () => {
  try {
    const response = await axiosInstance.post('/auth/refresh-token');
    const {accessToken} = response.data
    useAuthStore.getState().refreshTokens(accessToken);
  } catch (error) {
    console.error("Token Refresh Error:", error);
    // Handle expired refresh token — redirect to login
    if (error.response?.status === 401) {
      window.location.href = "/login";
    }
    throw error.response?.data || { message: "Token Refresh failed" };
  }
};