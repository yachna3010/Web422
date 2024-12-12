export const setToken = (token) => {
    localStorage.setItem("authToken", token);
  };
  
  export const readToken = () => {
    return localStorage.getItem("authToken");
  };
  
  export const removeToken = () => {
    localStorage.removeItem("authToken");
  };
  