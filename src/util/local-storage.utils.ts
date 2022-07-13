const getData = (key: string) => {
  return localStorage.getItem(key);
};
const setData = (key: string, data: string) => {
  localStorage.setItem(key, data);
};

export const getAuthToken = (): string | null => {
  return getData("TOKEN");
};

export const setAuthToken = (token: string) => {
  setData("TOKEN", token);
};
