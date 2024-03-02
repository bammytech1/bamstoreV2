import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;
console.log(BACKEND_URL);
export const API_URL = `${BACKEND_URL}/api/users/`;

//register user

const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData, {
    withCredentials: true,
  });
  return response.data;
};

//verify email address

const verifyEmail = async (emailToken) => {
  const response = await axios.post(API_URL + "verify-email", emailToken);
  return response.data;
};

//login user

const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData, {
    withCredentials: true,
  });
  return response.data;
};

//logout user

const logout = async () => {
  const response = await axios.get(API_URL + "logout");
  return response.data.message;
};

//get login status

const getLoginStatus = async () => {
  const response = await axios.get(API_URL + "getLoginStatus", {
    withCredentials: true,
  });
  return response.data;
};

//get user

const getUser = async () => {
  const response = await axios.get(API_URL + "getUser");
  return response.data;
};

//delete a user

const deleteUser = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};

//get all users

const getUsers = async () => {
  const response = await axios.get(API_URL + "");
  return response.data;
};
//update user profile

const updateUser = async (userData) => {
  const response = await axios.patch(API_URL + "updateUser", userData);
  return response.data;
};

//update user photo

const updatePhoto = async (userData) => {
  const response = await axios.patch(API_URL + "updatePhoto", userData);
  return response.data;
};

const authService = {
  register,
  login,
  logout,
  getLoginStatus,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  updatePhoto,
  verifyEmail,
};

export default authService;
