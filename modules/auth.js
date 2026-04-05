export const getToken = () => localStorage.getItem("token");
export const getUserName = () => localStorage.getItem("userName");

export const saveUser = (token, name) => {
  localStorage.setItem("token", token);
  localStorage.setItem("userName", name);
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userName");
};

export const isLoggedIn = () => !!getToken();
