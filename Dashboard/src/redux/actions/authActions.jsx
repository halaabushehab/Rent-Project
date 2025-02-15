import axios from "axios";

// إجراء تسجيل الدخول
export const login = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post("/api/auth/login", credentials);
    dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
  } catch (error) {
    console.error(error);
  }
};

// إجراء تسجيل الخروج
export const logout = () => (dispatch) => {
  dispatch({ type: "LOGOUT" });
};

// إجراء التسجيل (Sign Up)
export const signup = (userData) => async (dispatch) => {
  try {
    const response = await axios.post("/api/auth/signup", userData);
    dispatch({ type: "SIGNUP_SUCCESS", payload: response.data });
  } catch (error) {
    console.error(error);
  }
};
