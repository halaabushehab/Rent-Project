const initialState = {
  user: null,
  isAuthenticated: false,
  signupSuccess: false, // حالة نجاح التسجيل
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    case "SIGNUP_SUCCESS":
      return {
        ...state,
        signupSuccess: true, // تحديث حالة نجاح التسجيل
      };
    default:
      return state;
  }
};

export default authReducer;
