export const setToken = (token: string) => {
  console.log("login token set!!");

  localStorage.setItem("token", token);
};

export const resetToken = () => {
  localStorage.removeItem("token");
  // location.replace(urls.Main);
};

export const isLogin = () => {
  return !!localStorage.getItem("token");
};
