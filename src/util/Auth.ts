/* eslint-disable no-restricted-globals */
// import urls from "../constants/urls";

export const login = (token: string) => {
  localStorage.setItem("token", token);
};

export const logout = () => {
  localStorage.removeItem("token");
  // location.replace(urls.Main);
};

export const isLogin = () => {
  return !!localStorage.getItem("token");
};
