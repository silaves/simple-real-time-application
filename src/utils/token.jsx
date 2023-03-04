import axios from "axios";
import config from "../config/config";

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}

export const saveTokenToLocalStorage = (token) => {
  localStorage.setItem(config.nameUserToken, token);
  setAuthToken(token);
}

export const removeTokenFromLocalStorage = () => {
  localStorage.removeItem(config.nameUserToken);
};