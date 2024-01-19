import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;
console.log(BACKEND_URL);
export const API_URL = `${BACKEND_URL}/api/users/`;

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["authorization"];
  }
};

//register user

const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData, {
    withCredentials: true,
  });
  return response.data;
};

//login user

const login = async (userData) => {
  try {
    const response = await axios.post(API_URL + "login", userData);
    const { token, user } = response.data;

    // Set the token in the headers
    setAuthToken(token);

    // Optionally, you can dispatch an action to store the token in the Redux store
    // Example: dispatch(setToken(token));

    return user;
  } catch (error) {
    throw error;
  }
};

//logout user

const logout = async () => {
  const response = await axios.get(API_URL + "logout");
  return response.data.message;
};

//get login status

const getLoginStatus = async () => {
  const response = await axios.get(API_URL + "getLoginStatus");
  return response.data;
};

//get user

const getUser = async () => {
  const response = await axios.get(API_URL + "getUser");
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
  getUser,
  updateUser,
  updatePhoto,
};

export default authService;
